"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { Check } from "lucide-react";
import BottomTabs from "@/components/BottomTabs/BottomTabs";
import PayButton from "@/components/PayButton/PayButton";
import CheckMark from "../../../public/Check";

const SubscriptionPage = () => {
  const [selectedPlan, setSelectedPlan] = useState(null); // По умолчанию выбран Продвинутый план
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const plan = {
    name: "Базовый",
    price: "$9.99/мес",
    amount: 4,
    features: [
      "Доступ к основным функциям",
      "Ограниченное кол-во запросов",
      "Базовая поддержка",
    ],
  };

  useEffect(() => {
    // Сбрасываем ошибку, если данные правильные
    if (userId) {
      setError(null);
    } else {
      setError("Некорректные данные userId");
    }
  }, [userId]);

  // Проверяем, есть ли активная подписка
  // const checkSubscription = async (userId) => {
  //   try {
  //     const response = await fetch(`/api/check-subscription?userId=${userId}`);
  //     const data = await response.json();
  //     setIsSubscribed(data.isActive);
  //   } catch (error) {
  //     console.error("Ошибка проверки подписки:", error);
  //   }
  // };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const tgWebApp = window.Telegram?.WebApp;
      const tgUserId = tgWebApp?.initDataUnsafe?.user?.id;

      // Используем ID из URL или из Telegram WebApp
      if (tgUserId !== userId) {
        setUserId(tgUserId || null);
        console.log("User ID:", tgUserId);
      }
    }
  }, []);
  // Оплата подписки
  const handlePayment = async () => {
    try {
      const response = await fetch("/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: plan.amount, userId }),
      });

      const data = await response.json();
      if (response.ok) {
        window.location.href = data.pay_url;
      } else {
        setError("Ошибка создания платежа: " + data.error);
      }
    } catch (err) {
      setError("Произошла ошибка: " + err.message);
    }
  };

  return (
    <div className={styles.subscriptionContainer}>
      <h1 className={styles.title}>
        Подберите <br /> для себя лучший <br /> вариант подписки
        <span style={{ position:'relative', display: "inline-block",left:'3px', top: "2px" }}>
          <CheckMark />
        </span>
      </h1>

      <div
        className={`${styles.planCard} ${isSubscribed ? styles.selected : ""}`}
      >
        <div className={styles.planHeader}>
          <h2 className={styles.planName}>{plan.name}</h2>
          <p className={styles.planPrice}>{plan.price}</p>
        </div>

        <ul className={styles.featureList}>
          {plan.features.map((feature, idx) => (
            <li key={idx} className={styles.featureItem}>
              <Check size={18} />
              <p className={styles.aboutFeature}>{feature}</p>
            </li>
          ))}
        </ul>

        {isSubscribed ? (
          <button className={styles.activatedButton}>План активирован</button>
        ) : (
          <button className={styles.selectButton} onClick={handlePayment}>
            Купить подписку
          </button>
        )}
      </div>
      <div> {userId ? "User ID: " + userId : "User ID: неизвестен"}</div>
      {error && <p style={{ color: "red" }}>{error} </p>}

      <BottomTabs />
    </div>
  );
};

export default SubscriptionPage;
