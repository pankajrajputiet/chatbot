import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../features/chat/chatSlice";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

export default function ChatWindow() {
  const dispatch = useDispatch();
  const { messages, sessionId } = useSelector((state) => state.chat);
  console.log("messages:====>", messages);
  const socketRef = useRef(null);
  const bottomRef = useRef(null);
  const isConnectedRef = useRef(false);

  // 🔹 Connect WebSocket once
  useEffect(() => {
    if (isConnectedRef.current) return;

    const socket = new WebSocket("ws://localhost:8080/ws/chat");
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("WebSocket connected");
      isConnectedRef.current = true;
      socket.send(JSON.stringify({ type: "init", sessionId }));
    };

    socket.onmessage = (event) => {
      try {
        const response = JSON.parse(event.data);
        console.log("received data: ====>", response);
        // CASE 1: backend sends array (multiple parts)
        if (Array.isArray(response.messages)) {
          response.messages.forEach((message) => {
            dispatch(addMessage({
              id: Date.now().toString() + Math.random(),
              role: "assistant",
              type: message.type,
              ...message,
            }));
          });
          return;
        }

        // CASE 2: single message
        dispatch(addMessage({
          id: Date.now().toString(),
          role: "assistant",
          type: response.type ?? "text",
          ...response,
        }));

      } catch {
        // fallback text
        dispatch(addMessage({
          id: Date.now().toString(),
          role: "assistant",
          type: "text",
          content: event.data,
        }));
      }
    };

    socket.onerror = (err) => console.error("WebSocket error", err);

    socket.onclose = () => {
      console.log("WebSocket disconnected");
      isConnectedRef.current = false;
    };

    return () => socket.close();
  }, [dispatch, sessionId]);

  // 🔹 Scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🔹 Send text
  const sendMessage = (message) => {
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) return;

    dispatch({
      type: "chat/addMessage",
      payload: {
        id: Date.now().toString(),
        role: "user",
        content: message,
      },
    });

    socketRef.current.send(
      JSON.stringify({ type: "message", message, sessionId })
    );
  };

  // 🔹 Handle option click
  const handleOptionClick = (option) => {
    sendMessage(option);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            onOptionClick={handleOptionClick}
          />
        ))}
        <div ref={bottomRef} />
      </div>

      <ChatInput onSend={sendMessage} />
    </div>
  );
}
``
