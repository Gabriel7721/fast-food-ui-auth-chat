import { useEffect, useRef, useState } from "react";
import type {
  ChatMessage,
  ChatTypingPayload,
  Incoming,
} from "../types/chat-types";

const WS_BASE = "ws://localhost:7777/chat";

export function useChatSocket(token: string | null, email: string | null) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<
    "idle" | "connecting" | "open" | "closed"
  >("idle");

  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    setStatus("connecting");
    setError(null);

    const url = new URL(WS_BASE);
    url.searchParams.set("name", email || "guest");
    if (token) url.searchParams.set("token", token);
    const ws = new WebSocket(url.toString());
    socketRef.current = ws;

    ws.onopen = () => setStatus("open");
    ws.onmessage = (ev) => {
      try {
        const data = JSON.parse(
          typeof ev.data === "string" ? ev.data : String(ev.data),
        ) as Incoming;

        if (data.type === "Websocket is connected successfully") {
          setMessages([...data.chat_history].sort((a, b) => a.at - b.at));
        } else if (data.type === "chat.new") {
          setMessages((prev) => [...prev, data.msg]);
        } else {
          const t = data as ChatTypingPayload;
          setTypingUsers((prev) => {
            const others = prev.filter((n) => {
              n !== t.from;
            });
            return t.isTyping ? [...others, t.from] : others;
          });
        }
      } catch {}
    };

    ws.onclose = (ev) => {
      if (socketRef.current !== ws) return;
      setStatus("closed");
      if (ev.code !== 1000 && ev.reason) setError(ev.reason);
    };

    return () => {
      if (
        ws.readyState === WebSocket.OPEN ||
        ws.readyState === WebSocket.CLOSING
      ) {
        ws.close();
      }
      if (socketRef.current === ws) socketRef.current = null;
    };
  }, [token, email]);

  const send = (text: string) => {
    const ws = socketRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN) return false;
    ws.send(text);
    return true;
  };

  const notifyTyping = (isTyping: boolean) => {
    const ws = socketRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN) return;
    ws.send(JSON.stringify({ type: "typing", isTyping }));
  };

  return { messages, status, error, send, notifyTyping, typingUsers };
}
