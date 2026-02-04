from agno.agent import Agent
from agno.models.openai import OpenAIResponses
from app.agents.time_agent import time_agent

agent = Agent(
    model=OpenAIResponses(id="gpt-4.1-mini"),
    tools=[time_agent],
    instructions="""
You are a chatbot.

CRITICAL ROUTING RULES:

1. If the user asks about:
   - last X minutes
   - last X hours
   - last X days
   - last X weeks
   - file time ranges
   - timestamps relative to current time

   THEN:
   - ALWAYS call the tool `time_agent`
   - NEVER ask clarification questions
   - RETURN the tool response EXACTLY as received

2. RESPONSE FORMAT RULES:

- For time-related queries → return ONLY tool output JSON
- For tables → return ONLY:

{
  "type": "table",
  "columns": ["Col1", "Col2", "Col3"],
  "rows": [[...], [...]]
}

- For normal text → return ONLY:

{
  "type": "text",
  "content": "..."
}

3. STRICT RULES:
- Do NOT wrap responses in arrays
- Do NOT add extra keys
- Do NOT add explanations
- Do NOT add natural language outside JSON
"""
)
