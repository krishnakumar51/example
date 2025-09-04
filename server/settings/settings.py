from pydantic_settings import BaseSettings
from typing import Literal, Optional, List
from passlib.context import CryptContext

class Settings(BaseSettings):
    SECRET_KEY: str = "change-me"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 1 day for cookies; adjust as needed
    ALGORITHM: str = "HS256"

    MONGO_URI: str = "mongodb://localhost:27017"
    MONGO_DB: str = "fastapi_cookie_auth"

    # Add Celery configuration
    RABBITMQ_URL: str ="amqp://user:password@rabbitmq:5672//"
    REDIS_URL: str = "redis://redis:6379/0"

    COOKIE_NAME: str = "access_token"
    COOKIE_SECURE: bool = False  # True in production (https)
    COOKIE_SAMESITE: Literal["lax", "strict", "none"] = "none"  # React cross-site needs "none"
    COOKIE_DOMAIN: Optional[str] = None  # e.g., ".yourdomain.com"

    CORS_ORIGINS: List[str] = ["http://127.0.0.1:8080/", "http://localhost:3000", "http://localhost:8080/"]

    class Config:
        env_file = ".env"

settings = Settings()