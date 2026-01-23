from pymongo import MongoClient
from app.config import DATABASE_URL

client = MongoClient(DATABASE_URL)
db = client.chatbot_db
chat_collection = db.chats
