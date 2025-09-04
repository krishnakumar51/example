from passlib.context import CryptContext
from pydantic import BaseModel
from datetime import datetime, timedelta
from settings.settings import settings
from typing import Optional
from database.db_connect import users
from bson import ObjectId
from fastapi import Request, HTTPException, status, Depends
from jose import jwt, JWTError

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)

class TokenData(BaseModel):
    sub: str
    role: str
    exp: int

def create_access_token(*, user_id: str, role: str) -> str:
    expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    payload = {"sub": user_id, "role": role, "exp": expire}
    return jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.ALGORITHM)

async def get_user_by_id(user_id: str) -> Optional[dict]:
    try:
        _id = ObjectId(user_id)

    except Exception:
        return None
    return await users.find_one({"_id": _id})

async def get_current_user(request: Request) -> dict:
    token = request.cookies.get(settings.COOKIE_NAME)
    if not token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        data = TokenData(**payload)
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

    user = await get_user_by_id(data.sub)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
    return user

class RoleGuard:
    def __init__(self, *roles: str):
        self.roles = set(roles)

    async def __call__(self, user: dict = Depends(get_current_user)):
        if self.roles and user.get("role") not in self.roles:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden")
        return user