import asyncio
from fastapi import WebSocket, WebSocketDisconnect
from app.database import chat_collection
from app.openai_client import chat_with_memory

async def websocket_chat(ws: WebSocket):
    await ws.accept()

    try:
        session_id = await ws.receive_text()
        print("Session connected:", session_id)

        while True:
            user_message = await ws.receive_text()
            print("User:", user_message)

            history = chat_collection.find_one({"session_id": session_id})
            messages = history["messages"] if history else []

            messages.append({"role": "user", "content": user_message})

            reply = await asyncio.to_thread(chat_with_memory, messages)

            messages.append({"role": "assistant", "content": reply})

            chat_collection.update_one(
                {"session_id": session_id},
                {"$set": {"messages": messages}},
                upsert=True
            )

            await ws.send_text(reply)

    except WebSocketDisconnect:
        print("WebSocket disconnected safely")
