"use client";
import { useState } from "react";
import styles from "./page.module.scss";

const SubscriptionPage = () => {
  const [activeSubscription, setActiveSubscription]=useState  ("Базовый");

  const subscriptionPlans = [
    {
      name: "Базовый",
      price: "299 ₽/месяц",
      features: [
        "Доступ к основным функциям",
        "Ограниченное количество запросов",
      ],
    },
    {
      name: "Продвинутый",
      price: "599 ₽/месяц",
      features: [
        "Все функции базового плана",
        "Неограниченное количество запросов",
        "Приоритетная поддержка",
      ],
    },
    {
      name: "Премиум",
      price: "999 ₽/месяц",
      features: [
        "Все функции продвинутого плана",
        "Эксклюзивные функции",
        "Персональный менеджер",
      ],
    },
  ];

  return (
    <div className={styles.subscriptionContainer}>
      <h1>Подписка</h1>
      {activeSubscription && (
        <div className={styles.activeSubscription}>
          <h2>Активная подписка: {activeSubscription}</h2>
          <p>Действует до: 31 декабря 2023</p>
        </div>
      )}
      <div className={styles.planContainer}>
        {subscriptionPlans.map((plan, index) => (
          <div key={index} className={styles.planCard}>
            <h2>{plan.name}</h2>
            <p className={styles.price}>{plan.price}</p>
            <ul>
              {plan.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
            <button className={styles.subscribeButton}>Выбрать</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPage;
