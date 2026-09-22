import { useEffect } from "react";
import { createGreenApi } from "../services/greenApi";

export function useChatPolling({
  idInstance,
  apiTokenInstance,
  onMessageReceived,
}) {
  useEffect(() => {
    let isMounted = true;
    const api = createGreenApi(idInstance, apiTokenInstance);

    const poll = async () => {
      while (isMounted) {
        try {
          const data = await api.receiveNotification();

          // Если данных нет, делаем небольшую паузу (например, 1-2 секунды)
          // и переходим к следующей итерации, чтобы не вешать браузер
          if (!data) {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            continue;
          }

          const { receiptId, body } = data;

          if (
            body?.typeWebhook === "incomingMessageReceived" &&
            body?.messageData?.typeMessage === "textMessage"
          ) {
            const senderId = body.senderData.chatId;
            const text = body.messageData.textMessageData.textMessage;

            onMessageReceived(
              {
                id: receiptId.toString(),
                text,
                type: "incoming",
              },
              senderId,
            );
          }

          // Обязательно удаляем уведомление, чтобы оно не пришло повторно
          await api.deleteNotification(receiptId);
        } catch (error) {
          console.error("Polling error:", error);
          // В случае ошибки сети ждем 5 секунд перед повтором
          await new Promise((resolve) => setTimeout(resolve, 5000));
        }
      }
    };

    poll();

    return () => {
      isMounted = false;
    };
  }, [idInstance, apiTokenInstance, onMessageReceived]);
}
