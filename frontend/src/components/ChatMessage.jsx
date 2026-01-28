import { Button } from "@mui/material";

export default function ChatMessage({ id, role, content, options, onOptionClick }) {
  const isUser = role === "user";

  return (
    <div className={`my-2 flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-4 py-2 rounded-lg max-w-xs ${
          isUser ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
        }`}
      >
        {content}
      </div>

      {/* 🔹 Show buttons if bot message has options */}
      {!isUser && options && (
        <div className="mt-2 flex flex-wrap gap-2">
          {options.map((opt, i) => (
            <Button
              key={i}
              variant="outlined"
              size="small"
              onClick={() => onOptionClick(opt, id)}
            >
              {opt}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
