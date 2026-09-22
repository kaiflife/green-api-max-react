import { memo } from "react";

const ChatListItem = memo(({ chat, isActive, onClick, onDelete }) => {
  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(chat);
  };

  return (
    <div className="chat-list-item-wrapper">
      <button
        type="button"
        onClick={() => onClick(chat)}
        className={`chat-list-btn ${isActive ? "active" : ""}`}
      >
        💬 {chat}
      </button>
      <button
        type="button"
        className="btn-delete-chat"
        onClick={handleDeleteClick}
        title="Удалить чат"
      >
        &times;
      </button>
    </div>
  );
});

ChatListItem.displayName = "ChatListItem";

function ChatList({ chats, activeChat, onChatSelect, onChatDelete }) {
  if (chats.length === 0) return null;

  return (
    <div className="chats-section">
      <h4>Ваши чаты:</h4>
      <div className="chats-container">
        {chats.map((chat) => (
          <ChatListItem
            key={chat}
            chat={chat}
            isActive={chat === activeChat}
            onClick={onChatSelect}
            onDelete={onChatDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default ChatList;
