// import { useState, type FormEvent, useRef, useEffect } from "react";
// import { useAuth } from "../auth/AuthContext";
// import type { ChatMessage } from "../types/chat-types";

// export default function ChatPage() {
//   const { token, email } = useAuth();
//   const { messages, status, error, send } = useChatSocket(token, email);

//   const [input, setInput] = useState("");
//   const bottomRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages.length]);

//   const onSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     const text = input.trim();
//     if (!text) return;
//     send(text);
//     setInput("");
//   };

//   const format = (t: number) =>
//     new Intl.DateTimeFormat("vi-VN", {
//       hour: "2-digit",
//       minute: "2-digit",
//       second: "2-digit",
//     }).format(new Date(t));

//   return (
//     <div className="chatPage">
//       <h2>Chat</h2>
//       <p className="chatStatus">
//         Trạng thái: {status}
//         {error && <span className="chatError"> – {error}</span>}
//       </p>

//       <div className="chatWindow">
//         {messages.map((m: ChatMessage) => {
//           const isMe = (email || "guest") === m.from;
//           return (
//             <div key={m.id} className={`chatMessage ${isMe ? "me" : "other"}`}>
//               <div className="meta">
//                 <span className="from">{m.from}</span>
//                 <span className="time">{format(m.at)}</span>
//               </div>
//               <div className="text">{m.text}</div>
//             </div>
//           );
//         })}
//         <div ref={bottomRef} />
//       </div>

//       <form className="chatForm" onSubmit={onSubmit}>
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           disabled={status !== "open"}
//           placeholder={
//             status === "open" ? "Nhập tin nhắn..." : "Đang kết nối..."
//           }
//         />
//         <button type="submit" disabled={!input.trim() || status !== "open"}>
//           Gửi
//         </button>
//       </form>
//     </div>
//   );
// }
