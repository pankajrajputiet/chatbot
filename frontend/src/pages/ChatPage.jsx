import ChatWindow from "../components/ChatWindow";

export default function ChatPage({ inputMessage, setInputMessage }) {
  
  return (
    <div className="h-screen bg-gray-100 p-4">
      <div className="w-full max-w-2xl h-full bg-white shadow-lg rounded-lg flex flex-col">
        
        <div className="border-b font-bold text-center">
          AI Chatbot 🤖
        </div>

        <ChatWindow
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
        />
      </div>
    </div>
  );
}