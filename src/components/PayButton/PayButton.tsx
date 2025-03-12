import React, { useState } from "react";

export default function PayButton({ amount }) {
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
          amount: amount, // Используем сумму из пропсов
          currency: "USD",
          order_id: `order_${Date.now()}`,
        }),
      });

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
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
