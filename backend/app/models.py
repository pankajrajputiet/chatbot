from pydantic import BaseModel

class Message(BaseModel):
    role:str
    content:str
    
class ChatRequest(BaseModel):
    session_id: str
    message:str  