import { useState } from "react";
import "./MessageForm.css";

function MessageForm({ onSendMessage }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    onSendMessage(message);
    setMessage(""); // Очищаем поле ввода сразу после отправки
  };

  return (
    <form onSubmit={handleSubmit} className="message-form">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Введите сообщение..."
      />
      <button type="submit">Отправить</button>
    </form>
  );
}

export default MessageForm;
