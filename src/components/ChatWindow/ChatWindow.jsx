import { useState } from "react";
import { createGreenApi } from "../../services/greenApi";
import { useChatPolling } from "../../hooks/useChatPolling";
import Sidebar from "../Sidebar/Sidebar";
import MessageList from "../MessageList/MessageList";
import MessageForm from "../MessageForm/MessageForm";
import "./ChatWindow.css";

function ChatWindow({ credentials, onLogout }) {
  const { idInstance, apiTokenInstance } = credentials;
  const api = createGreenApi(idInstance, apiTokenInstance);

  const [activeChat, setActiveChat] = useState("");

  // Список всех уникальных чатов в левой панели
  const [chats, setChats] = useState([]);

  // Объект с сообщениями для каждого чата
  const [chatsMessages, setChatsMessages] = useState({});

  // Фоновое получение уведомлений (Long Polling)
  useChatPolling({
    idInstance,
    apiTokenInstance,
    onMessageReceived: (newMessage, senderId) => {
      // Автоматически добавляем чат в список контактов слева, если от него пришло новое фоновое сообщение
      setChats((prev) =>
        prev.includes(senderId) ? prev : [...prev, senderId],
      );

      // Кладим сообщение в историю конкретного чата
      setChatsMessages((prev) => ({
        ...prev,
        [senderId]: [...(prev[senderId] || []), newMessage],
      }));
    },
  });

  // Функция добавления чата в общий список и переключения на него
  const addAndSelectChat = (chatId) => {
    setChats((prev) => (prev.includes(chatId) ? prev : [...prev, chatId]));
    setActiveChat(chatId);
  };

  const handleChatCreated = async (value, type) => {
    if (type === "chatId") {
      addAndSelectChat(value);
      return;
    }

    try {
      const realChatId = await api.checkAccount(value);
      addAndSelectChat(realChatId);
    } catch (error) {
      console.log("Номер не найден, используем прямой ID:", value);
      addAndSelectChat(value);
    }
  };

  const handleSendMessage = async (textToSend) => {
    try {
      await api.sendMessage(activeChat, textToSend);

      const newMessage = {
        id: Date.now().toString(),
        text: textToSend,
        type: "outgoing",
      };

      setChatsMessages((prev) => ({
        ...prev,
        [activeChat]: [...(prev[activeChat] || []), newMessage],
      }));
    } catch (error) {
      alert(error);
    }
  };

  const handleChatDelete = (chatIdToDelete) => {
    // 1. Удаляем из списка чатов в сайдбаре
    setChats((prev) => prev.filter((id) => id !== chatIdToDelete));

    // 2. Полностью очищаем историю сообщений этого чата из памяти
    setChatsMessages((prev) => {
      const updatedMessages = { ...prev };
      delete updatedMessages[chatIdToDelete];
      return updatedMessages;
    });

    // 3. Если удален текущий открытый чат — закрываем правую панель
    if (activeChat === chatIdToDelete) {
      setActiveChat("");
    }
  };

  const currentMessages = chatsMessages[activeChat] || [];

  return (
    <>
      <Sidebar
        idInstance={idInstance}
        chats={chats}
        activeChat={activeChat}
        onChatCreated={handleChatCreated}
        onChatSelect={(chatId) => setActiveChat(chatId)}
        onChatDelete={handleChatDelete}
        onLogout={onLogout}
      />

      <div className="chat-area">
        {activeChat ? (
          <>
            <MessageList messages={currentMessages} />
            <MessageForm onSendMessage={handleSendMessage} />
          </>
        ) : (
          <div className="chat-empty-state">
            Выберите чат или введите ID пользователя МАКС слева, чтобы начать
            общение
          </div>
        )}
      </div>
    </>
  );
}

export default ChatWindow;
