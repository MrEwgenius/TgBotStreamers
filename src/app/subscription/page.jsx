"use client"

import { useState } from "react"
import styles from "./page.module.scss"
import { Check } from "lucide-react"
import BottomTabs from "@/components/BottomTabs/BottomTabs"

const SubscriptionPage = () => {
  const [selectedPlan, setSelectedPlan] = useState(1) // По умолчанию выбран Продвинутый план

  const plans = [
    {
      name: "Базовый",
      price: "$9.99/мес",
      features: ["Доступ к основным функциям", "Ограниченное кол-во запросов", "Базовая поддержка"],
    },
    {
      name: "Продвинутый",
      price: "$19.99/мес",
      features: ["Доступ к основным функциям", "Ограниченное кол-во запросов", "Базовая поддержка"],
    },
   
  ]

  return (
    <div className={styles.subscriptionContainer}>
      <h1 className={styles.title}>
        Подберите <br />  для себя лучший <br /> вариант подписки
        <Check className={styles.checkIcon} size={20} />
      </h1>

      {plans.map((plan, index) => (
        <div
          key={index}
          className={`${styles.planCard} ${selectedPlan === index ? styles.selected : ""}`}
          onClick={() => setSelectedPlan(index)}
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

          {selectedPlan === index ? (
            <button className={styles.activatedButton}>План активирован</button>
          ) : (
            <button className={styles.selectButton}>Выбрать план</button>
          )}
        </div>
      ))}

      <BottomTabs />
    </div>
  )
}

export default SubscriptionPage

