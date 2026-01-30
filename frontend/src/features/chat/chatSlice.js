import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    sessionId: uuidv4(),
    messages: [
      {
        id: "init-1",
        role: "assistant",
        content: "Hi 👋 How can I help you?",
        options: ["CIP Backlog", "EEMS Backlog", "Create Incident"]
      }
    ]
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    clearChat: (state) => {
      state.messages = [];
    },
  },
});

export const { addMessage, clearChat } = chatSlice.actions;
export default chatSlice.reducer;
