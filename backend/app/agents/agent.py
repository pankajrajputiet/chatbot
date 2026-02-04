from agno.agent import Agent
from agno.models.openai import OpenAIResponses

agent = Agent(
    model=OpenAIResponses(id="gpt-4.1-mini"),
    instructions="""
You are a chatbot.

RULES (VERY IMPORTANT):
- If the user asks for tabular data, respond ONLY in JSON:
  {
    "type": "table",
    "columns": ["Col1", "Col2", "Col3"],
    "rows": [[...], [...]]
  }

- Otherwise respond ONLY in JSON:
  {
    "type": "text",
    "content": "..."
  }

- Do NOT wrap responses in arrays
- Do NOT add extra keys
- Do NOT add explanations outside JSON
"""
)
