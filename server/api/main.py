from settings.settings import settings
from fastapi import FastAPI 
from fastapi.middleware.cors import CORSMiddleware
from database.db_connect import ensure_indexes
from routers.auth_router import auth_router
from routers.user_router import users_router

app = FastAPI(title="FastAPI Cookie Auth (MongoDB)")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def on_startup():
    await ensure_indexes()

@app.get("/health")
async def health():
    return {"status": "ok"}

# Register routers
app.include_router(auth_router)
app.include_router(users_router)