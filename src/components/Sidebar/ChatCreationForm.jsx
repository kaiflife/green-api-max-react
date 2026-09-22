import { useState } from "react";

function ChatCreationForm({ inputType, onChatSubmit }) {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    const targetValue = e.target.value;

    const onlyDigits = targetValue.replace(/\D/g, "");

    setInputValue(onlyDigits);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue) return;

    onChatSubmit(inputValue);
    setInputValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="sidebar-form">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder={
          inputType === "phone" ? "Например, 79876543210" : "Например, 10000000"
        }
      />
      <button type="submit">Открыть чат</button>
    </form>
  );
}

export default ChatCreationForm;
