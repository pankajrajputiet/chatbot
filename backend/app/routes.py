from fastapi import APIRouter
from app.database import chat_collection
from app.models import ChatRequest
from app.openai_client import chat_with_memory

router = APIRouter()

@router.post("/chat")
def chat(req:ChatRequest):
    history = chat_collection.find_one({"session_id": req.session_id})
    messages = history["messages"] if history else []
    messages.append({"role":"user", "content": req.message})
    
    reply = chat_with_memory(messages)
    
    messages.append({"role":"assistant", "content": reply})
    
    chat_collection.update_one(
        {"session_id": req.session_id},
        {"$set":{"messages": messages}},
        upsert=True
    )
    
    return {"reply": reply}