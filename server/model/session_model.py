from pydantic import BaseModel
from .message_model import MessageModel
from typing import Optional

class SessionModel(BaseModel):
    chats: Optional[list[MessageModel]] = []
    id: str