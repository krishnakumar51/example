from motor.motor_asyncio import AsyncIOMotorClient
from settings.settings import settings

client = AsyncIOMotorClient("mongodb://host.docker.internal:27017")
db = client[settings.MONGO_DB]
users = db["users"]
sessions = db["sessions"]

async def ensure_indexes():
    await users.create_index("email", unique=True)