import { createSlice } from "@reduxjs/toolkit";

// ✅ Reasoning: Added initial bot message with options
// so the chat has pre-defined selectable options on load.
// Added removeOptions reducer to clear buttons after user selects.
const chatSlice = createSlice({
  name: "chat",
  initialState: {
    sessionId: "session-123", // can be dynamic if needed
    messages: [
      {
        id: "init-1",
        role: "assistant",
        content: "Hi 👋 How can I help you?",
        options: ["Order status", "Pricing info", "Technical support"] // initial clickable options
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
    removeOptions: (state, action) => {
      // 🔹 Clears options from a message once user clicks
      const msg = state.messages.find(m => m.id === action.payload);
      if (msg) msg.options = null;
    }
  },
});

export const { addMessage, clearChat, removeOptions } = chatSlice.actions;
export default chatSlice.reducer;
