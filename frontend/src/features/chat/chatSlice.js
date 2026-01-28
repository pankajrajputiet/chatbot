import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    sessionId: "session-123", 
    isChatStarted: false,
  },
  reducers: {
      startChat(state) {
      state.isChatStarted = true;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    clearChat: (state) => {
      state.messages = [];
    },
  },
});

export const {startChat, addMessage, clearChat } = chatSlice.actions;
export default chatSlice.reducer;
