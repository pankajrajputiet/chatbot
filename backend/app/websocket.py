from fastapi import WebSocket, WebSocketDisconnect
from app.agents.agent import agent
from app.response_parser import normalize_agent_response

async def websocket_chat(ws: WebSocket):
    await ws.accept()

    try:
        init = await ws.receive_json()
        session_id = init.get("sessionId")

        while True:
            data = await ws.receive_json()
            user_message = data["message"]

            # 🔥 Run Agno agent
            run_output = agent.run(user_message)

            # 🔥 Normalize response
            response = normalize_agent_response(run_output)

            # ✅ SEND CLEAN JSON
            await ws.send_json(response)

    except WebSocketDisconnect:
        print("WebSocket disconnected")
