"use client"

import { useState } from "react"
import styles from "./page.module.scss"
import { Check } from "lucide-react"

const SubscriptionPage = () => {
  const [selectedPlan, setSelectedPlan] = useState(null)

  const plans = [
    {
      name: "Базовый",
      price: "299 ₽/мес",
      features: ["Доступ к основным функциям", "Ограниченное количество запросов", "Базовая поддержка"],
    },
    {
      name: "Продвинутый",
      price: "599 ₽/мес",
      features: ["Все функции базового плана", "Неограниченное количество запросов", "Приоритетная поддержка"],
    },
    {
      name: "Премиум",
      price: "999 ₽/мес",
      features: ["Все функции продвинутого плана", "Эксклюзивные функции", "Персональный менеджер"],
    },
  ]

  return (
    <div className={styles.subscriptionContainer}>
      <h1>Выберите план подписки</h1>
      <div className={styles.planGrid}>
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`${styles.planCard} ${selectedPlan === index ? styles.selected : ""}`}
            onClick={() => setSelectedPlan(index)}
          >
            <h2>{plan.name}</h2>
            <p className={styles.price}>{plan.price}</p>
            <ul>
              {plan.features.map((feature, idx) => (
                <li key={idx}>
                  <Check size={18} />
                  {feature}
                </li>
              ))}
            </ul>
            <button className={styles.selectButton}>{selectedPlan === index ? "Выбрано" : "Выбрать план"}</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SubscriptionPage

