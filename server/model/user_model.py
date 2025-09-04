from pydantic import BaseModel, EmailStr
from datetime import datetime
from .session_model import SessionModel
from typing import Optional

class UserPublic(BaseModel):

    id: str
    email: EmailStr
    name: str
    role: str
    sessions: Optional[list[SessionModel]] = []
    created_at: datetime
    updated_at: datetime