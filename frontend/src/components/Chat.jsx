import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../features/chat/chatSlice";
import { TextField, Button } from "@mui/material";
import { useEffect, useRef } from "react";

export default function Chat() {
  const { register, handleSubmit, reset } = useForm();
  const messages = useSelector(state => state.chat.messages);
  const dispatch = useDispatch();
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = new WebSocket("ws://localhost:8000/ws/chat");
    socketRef.current.onopen = () => {
      socketRef.current.send("session-123");
    };

    socketRef.current.onmessage = (e) => {
      dispatch(addMessage({ role: "assistant", content: e.data }));
    };
  }, []);

  const onSubmit = (data) => {
    dispatch(addMessage({ role: "user", content: data.message }));
    socketRef.current.send(data.message);
    reset();
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <div className="h-96 overflow-y-auto border p-2">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "text-right" : ""}>
            <b>{m.role}:</b> {m.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 mt-2">
        <TextField fullWidth {...register("message")} />
        <Button type="submit" variant="contained">Send</Button>
      </form>
    </div>
  );
}
