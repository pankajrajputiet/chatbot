import { useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../features/chat/chatSlice";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

const WS_URL =
  import.meta.env.VITE_WS_URL ||
  `${window.location.protocol === "https:" ? "wss:" : "ws:"}//${window.location.host}/ws/chat`;

export default function ChatWindow({ inputMessage, setInputMessage }) {

  const dispatch = useDispatch();
  const { messages, sessionId } = useSelector((state) => state.chat);
  const socketRef = useRef(null);
  const bottomRef = useRef(null);
  const isConnectedRef = useRef(false);

  // ✅ Connect WebSocket once
  useEffect(() => {
    if (isConnectedRef.current) return;

    const socket = new WebSocket(WS_URL);
    socketRef.current = socket;

    socket.onopen = () => {
      isConnectedRef.current = true;
      socket.send(JSON.stringify({ type: "init", sessionId }));
    };

    socket.onmessage = (event) => {
      try {
        const response = JSON.parse(event.data);

        // CASE 1: multiple messages
        if (Array.isArray(response.messages)) {
          response.messages.forEach((message) => {
            dispatch(
              addMessage({
                id: Date.now().toString() + Math.random(),
                role: "assistant",
                type: message.type,
                ...message,
              })
            );
          });
          return;
        }

        // CASE 2: single message
        dispatch(
          addMessage({
            id: Date.now().toString(),
            role: "assistant",
            type: response.type ?? "text",
            ...response,
          })
        );
      } catch {
        // fallback
        dispatch(
          addMessage({
            id: Date.now().toString(),
            role: "assistant",
            type: "text",
            content: event.data,
          })
        );
      }
    };

    socket.onerror = () => {
      isConnectedRef.current = false;
    };

    socket.onclose = () => {
      isConnectedRef.current = false;
    };

    return () => socket.close();
  }, [dispatch, sessionId]);

  // ✅ Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ Send message
  const sendMessage = useCallback(
    (message) => {
      if (
        !socketRef.current ||
        socketRef.current.readyState !== WebSocket.OPEN
      )
        return;

      dispatch(
        addMessage({
          id: Date.now().toString(),
          role: "user",
          content: message,
        })
      );

      socketRef.current.send(
        JSON.stringify({ type: "message", message, sessionId })
      );
    },
    [dispatch, sessionId]
  );

  return (
    <div className="flex flex-col h-full">
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            onOptionClick={sendMessage}
          />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* ✅ Controlled Input */}
      <ChatInput
        onSend={sendMessage}
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
      />
    </div>
  );
}