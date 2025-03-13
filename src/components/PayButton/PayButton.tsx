"use client";
import React, { useEffect, useState } from "react";

export default function PayButton({ amount, userId }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!amount || !userId) {
      setError("Некорректные данные userId,amount");
    }
  }, [amount, userId]);
  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    const headers = new Headers({
      "Content-Type": "application/json",
      Authorization:
        "Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1dWlkIjoiTXpnek5Eaz0iLCJ0eXBlIjoicHJvamVjdCIsInYiOiI4Y2JhYTU2ZWRiMzMyOTI2YjcxNjNlNTc0OTA0MmZiMThmNDQ0ODBkNTZlOWE0YWY5MGNjYzcwODM5MmQ0YTMxIiwiZXhwIjo4ODEzNzYxOTE4N30.2rGSiAP7RcPnfNPuB5ySMvDmcg_o6kyLnsMt9Nu_TeI",
    });

    try {
      const response = await fetch(
        "https://api.cryptocloud.plus/v1/invoice/create",
        {
          method: "POST",

          headers: headers,
          body: JSON.stringify({
            amount: amount,
            shop_id: "oCu9otDwwj0vB4Js",
            currency: "USD",
            order_id: `order_${Date.now()}`,
            email: userId,
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
      {error && <p style={{ color: "red" }}>{error} </p>}
    </div>
  );
}
