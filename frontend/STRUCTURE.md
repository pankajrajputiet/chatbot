# 📁 Chatbot Frontend — Project Structure

## 🗂️ Directory Tree

```
frontend/
├── .github/
│   └── appmod/
│       └── appcat
├── .qodo/
│   ├── agents/
│   └── workflows/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Chat.jsx
│   │   ├── ChatInput.jsx
│   │   ├── ChatMessage.jsx
│   │   ├── ChatWindow.jsx
│   │   └── TableMessage.jsx
│   ├── features/
│   │   └── chat/
│   │       └── chatSlice.js
│   ├── pages/
│   │   └── ChatPage.jsx
│   ├── store/
│   │   └── store.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

---

## 🏗️ Component Hierarchy

```
index.html
 └── main.jsx                  (Entry point — mounts React app)
      └── <Provider store>     (Redux store provider)
           └── <App />
                └── <ChatPage />
                     └── <ChatWindow />        (WebSocket + state logic)
                          ├── <ChatMessage />   (renders each message)
                          │    └── <TableMessage />  (renders table-type messages)
                          └── <ChatInput />     (user input form)
```

---

## 🔄 Data Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│                        User                             │
│                    (types message)                       │
└──────────────┬──────────────────────────────────────────┘
               │
               ▼
┌──────────────────────────┐
│       ChatInput.jsx      │  ← react-hook-form
│  (captures user input)   │
└──────────┬───────────────┘
           │ onSend(message)
           ▼
┌──────────────────────────┐       ┌──────────────────────┐
│     ChatWindow.jsx       │       │   Redux Store        │
│  (WebSocket manager)     │──────▶│   (chat slice)       │
│                          │       │                      │
│  • sendMessage()         │       │  state.chat.messages  │
│  • handleOptionClick()   │       │  state.chat.sessionId │
└──────────┬───────────────┘       └──────────┬───────────┘
           │                                  │
           │  WebSocket                       │ useSelector
           │  send/receive                    │
           ▼                                  ▼
┌──────────────────────────┐       ┌──────────────────────┐
│   Backend Server         │       │   ChatMessage.jsx    │
│   ws://localhost:8080    │       │  (renders messages)  │
│   /ws/chat               │       │                      │
└──────────────────────────┘       │  ├── Text content    │
                                   │  ├── Table content   │
                                   │  │   └── TableMessage│
                                   │  └── Option buttons  │
                                   └──────────────────────┘
```

---

## 📄 File Descriptions

### Entry & Config

| File               | Description                                        |
| ------------------ | -------------------------------------------------- |
| `index.html`       | HTML shell with `<div id="root">` mount point      |
| `vite.config.js`   | Vite bundler configuration (React + Tailwind)      |
| `eslint.config.js` | ESLint rules for code quality                      |
| `package.json`     | Dependencies, scripts (`dev`, `build`, `lint`)     |

### Source — Core

| File           | Description                                                  |
| -------------- | ------------------------------------------------------------ |
| `main.jsx`     | App entry — wraps `<App>` with Redux `<Provider>`            |
| `App.jsx`      | Root component — renders `<ChatPage />`                      |
| `index.css`    | Global styles (Tailwind CSS imports)                         |

### Source — Pages

| File           | Description                                                  |
| -------------- | ------------------------------------------------------------ |
| `ChatPage.jsx` | Full-screen chat layout with header ("AI Chatbot 🤖") and `<ChatWindow />` |

### Source — Components

| File              | Description                                                                 |
| ----------------- | --------------------------------------------------------------------------- |
| `ChatWindow.jsx`  | Core chat logic — manages WebSocket connection, dispatches messages to Redux, renders message list + input |
| `ChatInput.jsx`   | Input form using `react-hook-form` with MUI `TextField` + `Button`          |
| `ChatMessage.jsx` | Single message bubble — supports text, table, and option button rendering   |
| `TableMessage.jsx`| Renders tabular data (columns + rows) inside a MUI `Table`                  |
| `Chat.jsx`        | Standalone chat component (alternate/legacy version with inline WebSocket)  |

### Source — State Management

| File                          | Description                                              |
| ----------------------------- | -------------------------------------------------------- |
| `store/store.js`              | Redux store configuration with `chat` reducer            |
| `features/chat/chatSlice.js`  | Chat slice — manages `messages[]` and `sessionId` state. Actions: `addMessage`, `clearChat` |

---

## ⚙️ Tech Stack

```
React 19          →  UI library
Vite 7            →  Build tool & dev server
Redux Toolkit     →  State management
React Redux       →  React bindings for Redux
Tailwind CSS 4    →  Utility-first CSS framework
MUI (Material) 7  →  Pre-built UI components
React Hook Form   →  Form handling
Axios             →  HTTP client (available for REST calls)
UUID              →  Unique session/message ID generation
WebSocket (native)→  Real-time communication with backend
```

---

## 🔌 WebSocket Protocol

```
Client → Server (on connect):
  { type: "init", sessionId: "<uuid>" }

Client → Server (user message):
  { type: "message", message: "<text>", sessionId: "<uuid>" }

Server → Client (single response):
  { type: "text"|"table", content: "...", options?: [...], columns?: [...], rows?: [...] }

Server → Client (multi-part response):
  { messages: [ { type, content, ... }, ... ] }
```

---

## 🚀 Available Scripts

| Command         | Description                     |
| --------------- | ------------------------------- |
| `npm run dev`   | Start Vite dev server           |
| `npm run build` | Production build                |
| `npm run lint`  | Run ESLint                      |
| `npm run preview` | Preview production build      |
