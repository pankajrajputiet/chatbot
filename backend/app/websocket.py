import asyncio
import logging
from fastapi import WebSocket, WebSocketDisconnect
from app.agents.agent import agent
from app.response_parser import normalize_agent_response

logger = logging.getLogger(__name__)

async def websocket_chat(ws: WebSocket):
    await ws.accept()
    session_id = None

    try:
        init = await ws.receive_json()
        session_id = init.get("sessionId")
        logger.info("WebSocket session started: %s", session_id)

        while True:
            data = await ws.receive_json()
            user_message = data.get("message")

            if not user_message or not isinstance(user_message, str):
                await ws.send_json({
                    "id": "error",
                    "role": "assistant",
                    "type": "text",
                    "content": "Invalid message format. Please send a text message."
                })
                continue

            try:
                run_output = await asyncio.to_thread(agent.run, user_message)
                response = normalize_agent_response(run_output)
                await ws.send_json(response)
            except Exception:
                logger.exception("Error processing message for session %s", session_id or "unknown")
                await ws.send_json({
                    "id": "error",
                    "role": "assistant",
                    "type": "text",
                    "content": "Sorry, something went wrong. Please try again."
                })

    except WebSocketDisconnect:
        logger.info("WebSocket disconnected: %s", session_id or "unknown")
    except Exception:
        logger.exception("Unexpected WebSocket error for session %s", session_id or "unknown")
