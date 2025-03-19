export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Метод не поддерживается" });
  }

  const { amount, userId } = req.body;

  if (!amount ||  !userId) {
    return res.status(400).json({ error: "Некорректные данные" });
  }
  const token = process.env.NEXT_PUBLIC_TOKEN;
  console.log(token);
  
  const headers = new Headers({
    "Content-Type": "application/json",
    Authorization: `Token ${token}`,
  });
  try {
    const response = await fetch(
      "https://api.cryptocloud.plus/v1/invoice/create",
      {
        method: "POST",

        headers: headers,
        body: JSON.stringify({
          amount: amount,
          shop_id: process.env.NEXT_PUBLIC_SHOP_ID,
          currency: "USD",
          order_id: userId,
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
