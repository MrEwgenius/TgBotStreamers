"use client";
import React, { useEffect, useState } from "react";

export default function PayButton({ amount, userId }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Сбрасываем ошибку, если данные правильные
    if (amount && userId) {
      setError(null);
    } else {
      setError("Некорректные данные userId, amount");
    }
  }, [amount, userId]);
  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    const headers = new Headers({
      "Content-Type": "application/json",
      Authorization: `Token ${process.env.TOKEN}`,
    });

    try {
      const response = await fetch(
        "https://api.cryptocloud.plus/v1/invoice/create",
        {
          method: "POST",

          headers: headers,
          body: JSON.stringify({
            amount: amount,
            shop_id: process.env.SHOP_ID,
            currency: "USD",
            order_id: userId,
            success_url: "https://tg-bot-streamers.vercel.app/", // Укажите ваш success URL
            cancel_url: "https://tg-bot-streamers.vercel.app/", // Укажите ваш cancel URL
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        window.location.href = data.pay_url;
      } else {
        setError("Ошибка создания платежа: " + data.error);
      }
    } catch (err) {
      setError("Произошла ошибка: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handlePayment} disabled={loading}>
        {loading ? "Создание оплаты..." : `Оплатить $${amount}`}
      </button>
      <div>{userId}</div>
      <div>{amount}</div>
      {error && <p style={{ color: "red" }}>{error} </p>}
    </div>
  );
}
