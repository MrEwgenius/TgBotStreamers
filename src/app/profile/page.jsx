"use client"

import { useState } from "react"
import styles from "./page.module.scss"
import { Calendar, Clock } from "lucide-react"

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("subscription")

  const subscriptionInfo = {
    plan: "Продвинутый",
    endDate: "31 декабря 2025",
  }

  const usageHistory = [
    { date: "2023-06-01", action: "Вход в приложение" },
    { date: "2023-06-02", action: "Обновление профиля" },
    { date: "2023-06-03", action: "Просмотр FAQ" },
    { date: "2023-06-04", action: "Изменение подписки" },
  ]

  return (
    <div className={styles.profileContainer}>
      <h1>Профиль пользователя</h1>
      <div className={styles.tabContainer}>
        <button
          className={`${styles.tabButton} ${activeTab === "subscription" ? styles.active : ""}`}
          onClick={() => setActiveTab("subscription")}
        >
          Подписка
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === "history" ? styles.active : ""}`}
          onClick={() => setActiveTab("history")}
        >
          История
        </button>
      </div>
      {activeTab === "subscription" && (
        <div className={styles.subscriptionInfo}>
          <h2>Информация о подписке</h2>
          <p>
            <strong>Текущий план:</strong> {subscriptionInfo.plan}
          </p>
          <p>
            <strong>Действует до:</strong> {subscriptionInfo.endDate}
          </p>
        </div>
      )}
      {activeTab === "history" && (
        <div className={styles.usageHistory}>
          <h2>История использования</h2>
          <ul>
            {usageHistory.map((item, index) => (
              <li key={index}>
                <Calendar size={18} />
                <span>{item.date}</span>
                <Clock size={18} />
                <span>{item.action}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default ProfilePage

