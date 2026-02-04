from pydantic import BaseModel
from typing import List, Union, Literal

class TextContent(BaseModel):
    type: Literal["text"]
    data: str

class TableContent(BaseModel):
    type: Literal["table"]
    data: dict  # { columns: [...], rows: [...] }

Content = Union[TextContent, TableContent]


class Message(BaseModel):
    role: str
    content: Content


class ChatRequest(BaseModel):
    session_id: str
    message: str
