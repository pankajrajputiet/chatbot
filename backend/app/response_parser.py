# app/response_parser.py
import json
import time

def normalize_agent_response(run_output):
    """
    Converts Agno RunOutput into frontend-friendly JSON
    """

    raw_content = run_output.content  # ✅ THIS IS KEY

    try:
        parsed = json.loads(raw_content)
    except Exception:
        parsed = {
            "type": "text",
            "content": raw_content
        }

    response = {
        "id": str(int(time.time() * 1000)),
        "role": "assistant",
        **parsed
    }

    return response
