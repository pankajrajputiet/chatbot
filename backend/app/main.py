import logging
from fastapi import FastAPI, WebSocket
from app.routes import router
from app.websocket import websocket_chat
from fastapi.middleware.cors import CORSMiddleware

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

@app.get("/health")
async def health_check():
    return {"status": "ok"}

@app.websocket("/ws/chat")
async def websocket_endpoint(ws: WebSocket):
    logger.info("WebSocket connected")
    await websocket_chat(ws)
