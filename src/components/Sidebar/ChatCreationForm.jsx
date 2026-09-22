import { useState } from "react";

function ChatCreationForm({ inputType, onChatSubmit }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedValue = inputValue.trim();
    if (!trimmedValue) return;

    onChatSubmit(trimmedValue);
    setInputValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="sidebar-form">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={
          inputType === "phone" ? "Например, 79876543210" : "Например, 12345678"
        }
      />
      <button type="submit">Открыть чат</button>
    </form>
  );
}

export default ChatCreationForm;
