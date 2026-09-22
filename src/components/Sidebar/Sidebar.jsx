import { useState } from "react";
import ChatSelectorType from "./ChatSelectorType";
import ChatCreationForm from "./ChatCreationForm";
import ChatList from "./ChatList";
import "./Sidebar.css";

function Sidebar({
  idInstance,
  chats = [],
  activeChat,
  onChatCreated,
  onChatDelete,
  onChatSelect,
  onLogout,
}) {
  const [inputType, setInputType] = useState("phone");

  const handleChatSubmit = (value) => {
    if (inputType === "phone") {
      let cleanNumber = value.replace(/\D/g, "");
      if (cleanNumber.startsWith("8") && cleanNumber.length === 11) {
        cleanNumber = `7${cleanNumber.slice(1)}`;
      }
      onChatCreated(cleanNumber, "phone");
    } else {
      onChatCreated(value, "chatId");
    }
  };

  return (
    <div className="sidebar">
      <div>
        <h3>Новый чат</h3>

        <ChatSelectorType inputType={inputType} onTypeChange={setInputType} />

        <ChatCreationForm
          inputType={inputType}
          onChatSubmit={handleChatSubmit}
        />

        <ChatList
          chats={chats}
          activeChat={activeChat}
          onChatSelect={onChatSelect}
          onChatDelete={onChatDelete}
        />
      </div>

      <div className="sidebar-footer">
        <p>ID: {idInstance}</p>
        <button type="button" onClick={onLogout} className="btn-danger">
          Выйти
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
