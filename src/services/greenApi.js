// src/services/greenApi.js

export const createGreenApi = (idInstance, apiTokenInstance) => {
  const baseUrl = `https://3100.api.green-api.com/waInstance${idInstance}`;

  return {
    checkAccount: async (phoneNumber) => {
      const response = await fetch(
        `${baseUrl}/CheckAccount/${apiTokenInstance}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phoneNumber: parseInt(phoneNumber, 10) }),
        },
      );
      if (!response.ok) throw new Error("Failed to check account");
      const data = await response.json();
      if (data && data.exist) {
        return data.chatId;
      }
      throw new Error("User not found in MAX");
    },
    sendMessage: async (chatId, message) => {
      const response = await fetch(
        `${baseUrl}/SendMessage/${apiTokenInstance}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chatId, message }),
        },
      );

      if (!response.ok) {
        const data = await response.json();

        const errorDescription =
          data?.invokeStatus?.description ||
          data?.correspondentsStatus?.description ||
          `Ошибка сервера (Статус: ${response?.status})`;

        throw new Error(errorDescription);
      }
      return response.json();
    },

    receiveNotification: async () => {
      const response = await fetch(
        `${baseUrl}/ReceiveNotification/${apiTokenInstance}`,
      );
      if (!response.ok) throw new Error("Failed to receive notification");
      return response.json();
    },

    deleteNotification: async (receiptId) => {
      const response = await fetch(
        `${baseUrl}/DeleteNotification/${apiTokenInstance}/${receiptId}`,
        {
          method: "DELETE",
        },
      );
      if (!response.ok) throw new Error("Failed to delete notification");

      return response.json();
    },
  };
};
