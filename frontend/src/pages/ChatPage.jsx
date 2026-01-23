import ChatWindow from "../components/ChatWindow";

export default function ChatPage() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md h-full bg-white shadow-lg rounded-lg flex flex-col">
        <div className="p-4 border-b font-bold text-center">
          AI Chatbot 🤖
        </div>
        <ChatWindow />
      </div>
    </div>
  );
}
