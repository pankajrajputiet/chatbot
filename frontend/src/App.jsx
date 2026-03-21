import { useState } from "react";
import ChatPage from "./pages/ChatPage";
import PromptPage from "./pages/PromptPage";

export default function App() {
  const [inputMessage, setInputMessage] = useState("");
  const handlePromptClick = (prompt) => {
    setInputMessage(prompt);
  };

  return (
    <div className="flex h-screen">
      
      {/* LEFT SIDE - CHAT */}
      <div className="w-4/6">
        <ChatPage
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
        />
      </div>

      {/* RIGHT SIDE - PROMPTS */}
      <div className="w-2/6">
        <PromptPage onSelectPrompt={handlePromptClick} />
      </div>
    </div>
  );
}