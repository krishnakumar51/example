from fastapi import APIRouter, Response, HTTPException
from datetime import datetime
from model.user_model import UserPublic
from schemas.user_schema import UserCreate, UserLogin
from database.db_connect import users
from utils.security import hash_password, verify_password, create_access_token
from settings.settings import settings

auth_router = APIRouter(prefix="/api/auth", tags=["auth"])

@auth_router.post("/register", response_model=UserPublic, status_code=201)
async def register(payload: UserCreate, response: Response):
    existing = await users.find_one({"email": payload.email})
    if existing:
        raise HTTPException(status_code=409, detail="Email already registered")

    now = datetime.utcnow()
    doc = {
        "email": payload.email,
        "password": hash_password(payload.password),
        "name": payload.name,
        "role": "user",  # default role
        "created_at": now,
        "updated_at": now,
        "sessions": []
    }
    result = await users.insert_one(doc)

    token = create_access_token(user_id=str(result.inserted_id), role="user")

    response.set_cookie(
        key=settings.COOKIE_NAME,
        value=token,
        httponly=True,
        secure=settings.COOKIE_SECURE,
        # samesite=settings.COOKIE_SAMESITE,
        samesite="lax",
        domain=settings.COOKIE_DOMAIN,
        max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        expires=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        path="/",
    )

    return UserPublic(
        id=str(result.inserted_id),
        email=doc["email"],
        name=doc["name"],
        role=doc["role"],
        created_at=doc["created_at"],
        updated_at=doc["updated_at"],
    )

@auth_router.post("/login", response_model=UserPublic)
async def login(payload: UserLogin, response: Response):
    print(payload)
    user = await users.find_one({"email": payload.email})
    if not user or not verify_password(payload.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token(user_id=str(user["_id"]), role=user.get("role", "user"))

    # Set cookie for React cross-site requests
    response.set_cookie(
        key=settings.COOKIE_NAME,
        value=token,
        httponly=True,
        secure=settings.COOKIE_SECURE,
        # samesite=settings.COOKIE_SAMESITE,
        samesite="lax",
        domain=settings.COOKIE_DOMAIN,
        max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        expires=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        path="/",
    )


    return UserPublic(
        id=str(user["_id"]),
        email=user["email"],
        name=user["name"],
        role=user.get("role", "user"),
        # sessions=user["sessions"],
        created_at=user["created_at"],
        updated_at=user["updated_at"],
    )

@auth_router.post("/logout")
async def logout(response: Response):
    response.delete_cookie(
        key=settings.COOKIE_NAME,
        domain=settings.COOKIE_DOMAIN,
        path="/",
    )
    return {"message": "Logged out"}