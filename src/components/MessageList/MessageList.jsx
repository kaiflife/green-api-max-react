import { useEffect, useRef } from "react";
import "./MessageList.css";

function MessageList({ messages }) {
  const messagesEndRef = useRef(null);

  // Автоматический скролл вниз при добавлении новых сообщений
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="messages-list">
      {messages.map((msg) => (
        <div key={msg.id} className={`message-item ${msg.type}`}>
          {msg.text}
        </div>
      ))}
      {/* Невидимый элемент-якорь, к которому плавно скроллится экран */}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default MessageList;
