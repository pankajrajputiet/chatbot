import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../features/chat/chatSlice";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

export default function ChatWindow() {
    const dispatch = useDispatch();
    const messages = useSelector((state) => state.chat.messages);
    const sessionId = useSelector((state) => state.chat.sessionId);

    const socketRef = useRef(null);
    const bottomRef = useRef(null);

    useEffect(() => {
        socketRef.current = new WebSocket("ws://localhost:8000/ws/chat");

        socketRef.current.onopen = () => {
            console.log("WebSocket connected");
            socketRef.current.send(sessionId);
        };

        socketRef.current.onmessage = (event) => {
            dispatch(addMessage({ role: "assistant", content: event.data }));
        };

        return () => socketRef.current.close();
    }, []);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = (message) => {
        if (socketRef.current?.readyState !== WebSocket.OPEN) {
            console.error("WebSocket not connected");
            return;
        }
        
        dispatch(addMessage({ role: "user", content: message }));
        socketRef.current.send(message);
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-4">
                {messages.map((msg, i) => (
                    <ChatMessage key={i} {...msg} />
                ))}
                <div ref={bottomRef} />
            </div>
            <ChatInput onSend={sendMessage} />
        </div>
    );
}
