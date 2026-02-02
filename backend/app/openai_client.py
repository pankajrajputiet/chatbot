from openai import OpenAI
from app.config import OPENAI_API_KEY


client = OpenAI(api_key=OPENAI_API_KEY)

def chat_with_memory(messages):
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages
    )
    # print("OpenAI response:====>", response.choices[0].message.content)
    return response.choices[0].message.content