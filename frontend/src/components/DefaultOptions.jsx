import { Card, CardContent, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { startChat, addMessage } from "../features/chat/chatSlice";
import { DEFAULT_OPTIONS } from "../constants/options";

export default function DefaultOptions({ socket }) {
  const dispatch = useDispatch();

  const selectOption = (option) => {
    dispatch(startChat());

    dispatch(addMessage({
      role: "user",
      content: option.label,
    }));

    socket.current.send(
      JSON.stringify({
        type: "INIT",
        payload: option.prompt,
      })
    );
  };

  return (
    <div className="h-full flex items-center justify-center">
      <div className="grid gap-6 md:grid-cols-3 p-6 max-w-5xl w-full">
        {DEFAULT_OPTIONS.map((opt) => (
          <Card key={opt.id} className="hover:shadow-xl">
            <CardContent className="text-center space-y-4">
              <h2 className="text-lg font-semibold">{opt.label}</h2>
              <Button
                variant="contained"
                fullWidth
                onClick={() => selectOption(opt)}
              >
                Select
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
