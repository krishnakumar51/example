from celery_app import celery
from ai_processor import ai_processing
from database.db_connect import db as data_base
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

@celery.task(bind=True, name="ai.process_session", soft_time_limit=1800, autoretry_for=(Exception,), retry_backoff=True, retry_kwargs={"max_retries":3})
def process_session_task(self, session_id: str, user_id: str):
    try:
        db = data_base
        sessions = db.get_collection("sessions")
        session = sessions.find_one({"session_id": session_id})
        
        if not session:
            return {"status": "error", "message": "session not found"}

        messages = session.get("chats", [])
        
        # Update status to processing
        sessions.update_one(
            {"session_id": session_id},
            {"$set": {"status": "processing", "started_at": datetime.utcnow()}}
        )

        # Call your AI processing function
        result = ai_processing(session_id=session_id, user_id=user_id, messages=messages)

        assistant_text = result.get("assistant_message", "")
        meta = result.get("meta", {})

        # Update with results
        sessions.update_one(
            {"session_id": session_id},
            {"$push": {"chats": {"role": "assistant", "content": assistant_text}},
             "$set": {"status": "completed", "completed_at": datetime.utcnow(), "meta": meta}}
        )

        return {"status": "success", "assistant_message": assistant_text}
        
    except Exception as e:
        logger.error(f"Task failed for session {session_id}: {str(e)}")
        # Update status to failed
        db = data_base
        sessions = db.get_collection("sessions")
        sessions.update_one(
            {"session_id": session_id},
            {"$set": {"status": "failed", "error": str(e), "failed_at": datetime.utcnow()}}
        )
        raise