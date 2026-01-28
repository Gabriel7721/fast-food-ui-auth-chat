import { useState, type FormEvent, useRef, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import type { ChatMessage } from "../types/chat-types";
import { useChatSocket } from "../api/useChatSocket";

export default function ChatPage() {
  const { token, email } = useAuth();
  const { messages, status, error, send, notifyTyping, typingUsers } =
    useChatSocket(token, email);

  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const typingTimeRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    send(text);
    setInput("");
    notifyTyping(false);

    if (typingTimeRef.current) {
      window.clearTimeout(typingTimeRef.current);
      typingTimeRef.current = undefined;
    }
  };

  const onChangeInput = (v: string) => {
    setInput(v);

    notifyTyping(true);
    if (typingTimeRef.current) {
      window.clearTimeout(typingTimeRef.current);
    }
    typingTimeRef.current = window.setTimeout(() => {
      notifyTyping(false);
    }, 1500); // 1.5 giây mà client không typing thì tắt typing.
  };

  const format = (t: number) =>
    new Intl.DateTimeFormat("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(new Date(t));

  return (
    <div className="chatPage">
      <h2>Chat</h2>
      <p className="chatStatus">
        Trạng thái: {status}
        {error && <span className="chatError"> – {error}</span>}
      </p>

      <div className="chatWindow">
        {messages.map((m: ChatMessage) => {
          const isMe = (email || "guest") === m.from;
          return (
            <div key={m.id} className={`chatMessage ${isMe ? "me" : "other"}`}>
              <div className="meta">
                <span className="from">{m.from}</span>
                <span className="time">{format(m.at)}</span>
              </div>
              <div className="text">{m.text}</div>
            </div>
          );
        })}

        {typingUsers.length > 0 && (
          <div>{typingUsers.join(", ")} đang nhập tin nhắn...</div>
        )}

        <div ref={bottomRef} />
      </div>

      <form className="chatForm" onSubmit={onSubmit}>
        <input
          value={input}
          onChange={(e) => onChangeInput(e.target.value)}
          disabled={status !== "open"}
          placeholder={
            status === "open" ? "Nhập tin nhắn..." : "Đang kết nối..."
          }
        />
        <button type="submit" disabled={!input.trim() || status !== "open"}>
          Gửi
        </button>
      </form>
    </div>
  );
}
