# from fastapi import APIRouter, Response, Depends, HTTPException, Body
# from model.user_model import UserPublic
# from schemas.user_schema import UserUpdate
# from datetime import datetime
# from database.db_connect import users, sessions
# from utils.security import RoleGuard, get_current_user, hash_password
# from settings.settings import settings
# from schemas.user_schema import MessageSchema
# from model.session_model import SessionModel
# from bson import ObjectId
# from uuid import uuid4
# from pymongo.errors import DuplicateKeyError
# from bson import ObjectId
# from typing import Any


# users_router = APIRouter(prefix="/api/users", tags=["users"])
from fastapi import APIRouter, Response, Depends, HTTPException, Body
from model.user_model import UserPublic
from schemas.user_schema import UserUpdate
from datetime import datetime
from database.db_connect import users, sessions
from utils.security import RoleGuard, get_current_user, hash_password
from settings.settings import settings
from schemas.user_schema import MessageSchema
from model.session_model import SessionModel
from bson import ObjectId

users_router = APIRouter(prefix="/api/users", tags=["users"])

@users_router.get("/me")
async def get_me(user: dict = Depends(get_current_user)):

    sessions_data = sessions.find({"_id": {"$in": user["sessions"]}})
    sessions_data = await sessions_data.to_list(length=len(user["sessions"]))
    sessions_data = [
        {**doc, "_id": str(doc["_id"])} if "_id" in doc else doc
        for doc in sessions_data
    ]

    return {
        "id": str(user["_id"]),
        "role": user["role"],
        "name": user["name"],
        "email": user["email"],
        "sessions": sessions_data
    }

@users_router.patch("/me", response_model=UserPublic)
async def update_me(payload: UserUpdate, user: dict = Depends(get_current_user)):
    update_doc = {"updated_at": datetime.utcnow()}
    if payload.name is not None:
        update_doc["name"] = payload.name # type: ignore
    if payload.password is not None:
        update_doc["password"] = hash_password(payload.password) # type: ignore

    await users.update_one({"_id": user["_id"]}, {"$set": update_doc})
    updated = await users.find_one({"_id": user["_id"]})

    return UserPublic(
        id=str(updated["_id"]), # type: ignore
        email=updated["email"], # type: ignore
        name=updated["name"], # type: ignore
        role=updated.get("role", "user"), # type: ignore
        created_at=updated["created_at"], # type: ignore
        updated_at=updated["updated_at"], # type: ignore
    )

@users_router.get("/get-session/{session_id}")
async def get_session(session_id: str, user: dict = Depends(get_current_user)):
    
    print(session_id)
    sessions_data = await sessions.find_one({"id": session_id})
    print(sessions_data)
    # sessions_data = await sessions_data.to_list(length=len(user["sessions"]))
    sessions_data["_id"] = str(sessions_data["_id"]) # type: ignore

    return sessions_data

@users_router.patch("/update-session/{session_id}")
async def update_session(
    session_id: str, 
    data: dict = Body(...), 
    user: dict = Depends(get_current_user)
):

    result = await sessions.find_one_and_update(
        {"id": session_id},
        {"$push": {"chats": {"role": data['role'], "content": data["content"]}}}
    )

    updated = await sessions.find_one({"id": session_id})

    return updated["chats"] # type: ignore

@users_router.post("/create-session")
async def create_session(data: dict, user: dict = Depends(get_current_user)):

    new_session = await sessions.insert_one({"chats": [], "id": data["session_id"]})
    new_session_id = ObjectId(new_session.inserted_id)

    await sessions.find_one_and_update(
        {"_id": new_session_id},
        {"$push": {"chats": {"role": "user", "content": data["message"]}}}
    )

    result = await users.update_one(
        {"_id": user["_id"]},
        {"$push": {"sessions": new_session.inserted_id}}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="User not found")

    return {"message": "new session created successfully"}

@users_router.delete("/me")
async def delete_me(response: Response, user: dict = Depends(get_current_user)):
    await users.delete_one({"_id": user["_id"]})
    # Clear cookie after account deletion
    response.delete_cookie(key=settings.COOKIE_NAME, domain=settings.COOKIE_DOMAIN, path="/")
    return {"message": "Account deleted"}

#######################
# Example: Admin only #
#######################

@users_router.get("/admin/peek", dependencies=[Depends(RoleGuard("admin"))])
async def admin_peek():
    # Minimal example: list totals
    total = await users.estimated_document_count()
    return {"total_users": total}

# ---------------------------
# Async processing endpoints
# ---------------------------
@users_router.post("/process-chat-async")
async def process_chat_async(
    message: str = Body(...), current_user: dict = Depends(get_current_user)
):
    """
    Create a session and queue a Celery task to process it asynchronously.
    The session `id` field is used as the external session identifier.
    """
    session_id = str(uuid4())

    session_doc = {
        "id": session_id,
        "user_id": current_user["_id"],
        "chats": [{"role": "user", "content": message}],
        "status": "queued",
        "created_at": datetime.utcnow(),
    }

    new_session = await sessions.insert_one(session_doc)
    # push ObjectId reference to user's sessions
    await users.update_one({"_id": current_user["_id"]}, {"$push": {"sessions": new_session.inserted_id}})

    # Queue Celery task (task should look up session by 'id')
    task = process_session_task.apply_async(args=(session_id, str(current_user["_id"])))

    return {
        "session_id": session_id,
        "task_id": task.id,
        "status": "queued",
        "message": "Processing started",
    }


@users_router.get("/session-status/{session_id}")
async def get_session_status(
    session_id: str, current_user: dict = Depends(get_current_user)
):
    """
    Return session status, chats and meta. Ensures session belongs to current user.
    """
    session_doc = await sessions.find_one({"id": session_id, "user_id": current_user["_id"]})
    if not session_doc:
        raise HTTPException(status_code=404, detail="Session not found")

    return {
        "session_id": session_id,
        "status": session_doc.get("status", "unknown"),
        "chats": session_doc.get("chats", []),
        "meta": session_doc.get("meta", {}),
    }
