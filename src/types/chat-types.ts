export type ChatMessage = {
  id: string;
  text: string;
  at: number;
  from: string;
};

export type HelloPayload = {
  type: "Websocket is connected successfully";
  you: { name: string; userId?: string; email?: string };
  chat_history: ChatMessage[];
};

export type ChatNewPayload = {
  type: "chat.new";
  msg: ChatMessage;
};

export type ChatTypingPayload = {
  type: "chat.typing";
  from: string;
  isTyping: boolean;
};

export type Incoming = HelloPayload | ChatNewPayload;
