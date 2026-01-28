import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, removeOptions } from "../features/chat/chatSlice";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

export default function ChatWindow() {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const sessionId = useSelector((state) => state.chat.sessionId);

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
      const data = JSON.parse(event.data);
      dispatch(addMessage({
        id: Date.now().toString(),
        role: "assistant",
        content: data.message
      }));
    };

    socket.onerror = (err) => console.error("WebSocket error", err);

    socket.onclose = () => {
      console.log("WebSocket disconnected");
      isConnectedRef.current = false;
    };

    return () => socket.close();
  }, [dispatch, sessionId]);

  // 🔹 Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🔹 Send free-text message
  const sendMessage = (message) => {
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) return;

    dispatch(addMessage({ id: Date.now().toString(), role: "user", content: message }));

    socketRef.current.send(JSON.stringify({ type: "message", message, sessionId }));
  };

  // 🔹 Handle clickable options
  const handleOptionClick = (option, msgId) => {
    // Remove options from bot message
    dispatch(removeOptions(msgId));

    // Add user message
    dispatch(addMessage({ id: Date.now().toString(), role: "user", content: option }));

    // Send to WebSocket
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ type: "message", message: option, sessionId }));
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} {...msg} onOptionClick={handleOptionClick} />
        ))}
        <div ref={bottomRef} />
      </div>

      <ChatInput onSend={sendMessage} />
    </div>
  );
}
