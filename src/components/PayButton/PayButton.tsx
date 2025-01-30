import React from "react";
import { useState } from "react";

export default function PayButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 100, // Укажите сумму платежа (в минимальных единицах, например 1000 = 10.00 RUB)
          currency: "USD", // Выберите валюту (например, RUB, USD, BTC)
          order_id: `order_${Date.now()}`, // Уникальный идентификатор заказа
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Перенаправление на страницу оплаты
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
        {loading ? "Создание оплаты..." : "Оплатить в криптовалюте"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
