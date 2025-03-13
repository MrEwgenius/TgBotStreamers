export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Метод не поддерживается" });
  }

  const { amount, currency, order_id } = req.body;

  // Убедитесь, что все обязательные данные переданы
  if (!amount || !currency || !order_id) {
    return res.status(400).json({ error: "Некорректные данные" });
  }
  try {
    const locale = "ru";
    const response = await fetch(
      "https://api.cryptocloud.plus/v2/invoice/create",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1dWlkIjoiTXpnek5Eaz0iLCJ0eXBlIjoicHJvamVjdCIsInYiOiI4Y2JhYTU2ZWRiMzMyOTI2YjcxNjNlNTc0OTA0MmZiMThmNDQ0ODBkNTZlOWE0YWY5MGNjYzcwODM5MmQ0YTMxIiwiZXhwIjo4ODEzNzYxOTE4N30.2rGSiAP7RcPnfNPuB5ySMvDmcg_o6kyLnsMt9Nu_TeI`,
        },
        body: JSON.stringify({
          shop_id: "oCu9otDwwj0vB4Js",
          amount,
          currency,
          order_id,
          add_fields: {
            uder_id: "user_id",
          },
          success_url: "https://tg-bot-streamers.vercel.app/", // Укажите ваш success URL
          cancel_url: "https://tg-bot-streamers.vercel.app/", // Укажите ваш cancel URL
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      return res.status(200).json(data); // Возвращаем URL для оплаты
    } else {
      return res.status(500).json({ error: data });
    }
  } catch (error) {
    return res.status(500).json({ error: "Ошибка сервера" });
  }
}
