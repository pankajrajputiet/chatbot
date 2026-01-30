import { useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";

export default function ChatInput({ onSend }) {
  const { register, handleSubmit, reset } = useForm();

  const submit = (data) => {
    if (!data.message.trim()) return;
    onSend(data.message);
    console.log("Submitted message:==>", data);
    reset();
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
      />
      <Button type="submit" variant="contained">
        Send
      </Button>
    </form>
  );
}
