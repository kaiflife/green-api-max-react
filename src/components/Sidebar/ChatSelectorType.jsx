function ChatSelectorType({ inputType, onTypeChange }) {
  return (
    <div className="sidebar-radio-group">
      <label className="sidebar-radio-label">
        <input
          type="radio"
          name="inputType"
          checked={inputType === "phone"}
          onChange={() => onTypeChange("phone")}
        />
        По телефону
      </label>
      <label className="sidebar-radio-label">
        <input
          type="radio"
          name="inputType"
          checked={inputType === "chatId"}
          onChange={() => onTypeChange("chatId")}
        />
        По Chat ID
      </label>
    </div>
  );
}

export default ChatSelectorType;
