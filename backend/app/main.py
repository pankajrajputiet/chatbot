from fastapi import FastAPI, WebSocket
from app.routes import router
from app.websocket import websocket_chat
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# app.include_router(router)

@app.websocket("/ws/chat")
async def websocket_endpoint(ws: WebSocket):
    print("WebSocket connected")
    await websocket_chat(ws)

# import uvicorn    

# if __name__ == "__main__":
#   uvicorn.run("main:app", port=5000, log_level="info")