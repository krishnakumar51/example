from typing import List, Dict, Any
import time
import logging
import os
from langchain_groq import ChatGroq
from langchain.schema import HumanMessage, SystemMessage
from settings.settings import settings

logger = logging.getLogger(__name__)

SYSTEM_PROMPT = "You are ScrapperGPT. Answer the user's queries and help with web scraping tasks."

def ai_processing(session_id: str, user_id: str, messages: List[Dict[str, Any]], **kwargs) -> Dict[str, Any]:
    """
    AI processing using ChatGroq via LangChain.
    """
    start_time = time.time()

    try:
        # Initialize the ChatGroq model
        chat_model = ChatGroq(
            model="llama3-8b-8192",
            api_key=settings.GROQ_API_KEY,
        )

        # Build messages for the chat model
        chat_messages = [SystemMessage(content=SYSTEM_PROMPT)]
        for msg in messages:
            if msg["role"] == "user":
                chat_messages.append(HumanMessage(content=msg["content"]))

        # Get response from ChatGroq
        response = chat_model(chat_messages)
        assistant_text = response.content

        processing_time = (time.time() - start_time) * 1000

        meta = {
            "processing_time_ms": processing_time,
            "model_used": "chatgroq",
            "session_id": session_id
        }

        logger.info(f"Processed session {session_id} in {processing_time:.2f}ms")
        return {
            "assistant_message": assistant_text,
            "meta": meta
        }

    except Exception as e:
        logger.error(f"AI processing failed for session {session_id}: {str(e)}")
        raise
