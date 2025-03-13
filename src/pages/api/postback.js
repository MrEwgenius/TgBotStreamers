import jwt from "jsonwebtoken";

const SECRET_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1dWlkIjoiTXpnek5Eaz0iLCJ0eXBlIjoicHJvamVjdCIsInYiOiI4Y2JhYTU2ZWRiMzMyOTI2YjcxNjNlNTc0OTA0MmZiMThmNDQ0ODBkNTZlOWE0YWY5MGNjYzcwODM5MmQ0YTMxIiwiZXhwIjo4ODEzNzYxOTE4N30.2rGSiAP7RcPnfNPuB5ySMvDmcg_o6kyLnsMt9Nu_TeI"; // Храни в переменных окружения!

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Метод не поддерживается" });
  }

  const { token, order_id, amount_crypto, currency, status } = req.body;

  if (!token || !order_id || !amount_crypto || !currency || !status) {
    return res.status(400).json({ error: "Некорректные данные" });
  }

  try {
    // Проверяем JWT-токен
    const decoded = jwt.verify(token, SECRET_KEY);

    if (!decoded) {
      return res.status(403).json({ error: "Неверная подпись токена" });
    }

    console.log("✅ Успешная верификация токена!", decoded);

    // // Отправляем данные на твой бекенд
    // const backendResponse = await fetch("https://твоя-api.com/payment-update", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     order_id,
    //     amount: amount_crypto,
    //     currency,
    //     status,
    //   }),
    // });

    // if (!backendResponse.ok) {
    //   throw new Error("Ошибка отправки данных на бекенд");
    // }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("❌ Ошибка обработки постбэка:", error);
    return res.status(500).json({ error: "Ошибка сервера" });
  }
}
