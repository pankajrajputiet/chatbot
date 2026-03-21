import { useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import { useEffect } from "react";

export default function ChatInput({ onSend, inputMessage, setInputMessage }) {
  const { register, handleSubmit, reset, setValue } = useForm();

  // ✅ Sync external state → form input
  useEffect(() => {
    setValue("message", inputMessage);
  }, [inputMessage, setValue]);

  const submit = (data) => {
    if (!data.message.trim()) return;
console.log("===>",data.message)
    onSend(data.message);
    setInputMessage(""); // clear parent state
    reset(); // clear form
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex gap-2 p-2 border-t"
    >
      <TextField
        fullWidth
        placeholder="Type a message..."
        {...register("message")}
        onChange={(e) => setInputMessage(e.target.value)} // ✅ keep sync
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit(submit)();
          }
        }}
      />

      <Button type="submit" variant="contained">
        Send
      </Button>
    </form>
  );
}