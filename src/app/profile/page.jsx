"use client"

import { useEffect, useState } from "react"
import styles from "./page.module.scss"
import { ChevronDown, ChevronUp } from "lucide-react"
import BottomTabs from "@/components/BottomTabs/BottomTabs"

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("subscription") // По умолчанию открыта вкладка История
  const [history, setHistory] = useState([])
  const [expandedItem, setExpandedItem] = useState(null)

  const subscriptionInfo = {
    plan: "Продвинутый",
    endDate: "31.12.2025",
  }

  useEffect(() => {
    const demoHistory = [
      {
        date: "2025-02-17",
        items: [
          {
            streamerName: "zubareff",
            results: {
              clientPrice: 1588.6,
              avgFtdAmount: 10.04,
              pricePerPlayer: 529.53,
              priceDifference: 10.39,
              proposedDiscount: 89.61,
              finalClientPrice: 165,
              finalStreamerPrice: 126.92,
            },
          },
          {
            streamerName: "melstroy",
            results: {
              clientPrice: 1200,
              avgFtdAmount: 8.5,
              pricePerPlayer: 400,
              priceDifference: 15,
              proposedDiscount: 75,
              finalClientPrice: 300,
              finalStreamerPrice: 250,
            },
          },
        ],
      },
      {
        date: "2025-01-03",
        items: [
          {
            streamerName: "streamer",
            results: {
              clientPrice: 900,
              avgFtdAmount: 7.2,
              pricePerPlayer: 350,
              priceDifference: 12,
              proposedDiscount: 65,
              finalClientPrice: 315,
              finalStreamerPrice: 280,
            },
          },
        ],
      },
      {
        date: "2024-12-22",
        items: [
          {
            streamerName: "streamer",
            results: {
              clientPrice: 1100,
              avgFtdAmount: 9.1,
              pricePerPlayer: 420,
              priceDifference: 14,
              proposedDiscount: 70,
              finalClientPrice: 330,
              finalStreamerPrice: 290,
            },
          },
          {
            streamerName: "streamer",
            results: {
              clientPrice: 1588.6,
              avgFtdAmount: 10.04,
              pricePerPlayer: 529.53,
              priceDifference: 10.39,
              proposedDiscount: 89.61,
              finalClientPrice: 165,
              finalStreamerPrice: 126.92,
            },
          },
        ],
      },
      {
        date: "2024-12-11",
        items: [
          {
            streamerName: "streamer",
            results: {
              clientPrice: 800,
              avgFtdAmount: 6.8,
              pricePerPlayer: 320,
              priceDifference: 11,
              proposedDiscount: 60,
              finalClientPrice: 320,
              finalStreamerPrice: 270,
            },
          },
        ],
      },
    ]

    setHistory(demoHistory)

    // Устанавливаем последний элемент как развернутый (для демонстрации)
    setExpandedItem("2024-12-22-1")
  }, [])

  const toggleExpand = (dateIndex, itemIndex) => {
    const itemKey = `${history[dateIndex].date}-${itemIndex}`
    setExpandedItem(expandedItem === itemKey ? null : itemKey)
  }

  // Функция для форматирования даты
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.toLocaleString("ru", { month: "long" })
    return `${day} ${month}`
  }

  return (
    <div className={styles.profileContainer}>
      <h1 className={styles.title}>
        Ваш профиль
        <span className={styles.userIcon}>👤</span>
      </h1>

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
            <span className={styles.label}>План:</span>
            <span className={styles.value}>{subscriptionInfo.plan}</span>
          </p>
          <p>
            <span className={styles.label}>Действителен до:</span>
            <span className={styles.value}>{subscriptionInfo.endDate}</span>
          </p>
        </div>
      )}

      {activeTab === "history" && (
        <div className={styles.historyContainer}>
          {history.length === 0 ? (
            <p>История пуста</p>
          ) : (
            history.map((dateGroup, dateIndex) => (
              <div key={dateGroup.date} className={styles.dateGroup}>
                <h3 className={styles.dateLabel}>{formatDate(dateGroup.date)}</h3>
                <ul className={styles.historyList}>
                  {dateGroup.items.map((item, itemIndex) => {
                    const itemKey = `${dateGroup.date}-${itemIndex}`
                    const isExpanded = expandedItem === itemKey

                    return (
                      <li key={itemKey} className={styles.historyItem}>
                        <div className={styles.historyHeader} onClick={() => toggleExpand(dateIndex, itemIndex)}>
                          <span className={styles.streamerName}>{item.streamerName}</span>
                          {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                        </div>

                        {isExpanded && (
                          <div className={styles.historyDetails}>
                            <p>
                              <span className={styles.label}>Цена заказчика:</span>{" "}
                              <span className={styles.value}>${item.results.clientPrice}</span>
                            </p>
                            <p>
                              <span className={styles.label}>Средняя сумма чека одного FTD:</span>{" "}
                              <span className={styles.value}>${item.results.avgFtdAmount}</span>
                            </p>
                            <p>
                              <span className={styles.label}>Цена одного игрока:</span>{" "}
                              <span className={styles.value}>${item.results.pricePerPlayer}</span>
                            </p>
                            <p>
                              <span className={styles.label}>Отличие цены:</span>{" "}
                              <span className={styles.value}>{item.results.priceDifference}%</span>
                            </p>
                            <p>
                              <span className={styles.longLabel}>Предлагаемое уменьшение цены стримера:</span>
                              <span className={styles.value}>{item.results.proposedDiscount}%</span>
                            </p>
                            <p>
                              <span className={styles.label}>Цена заказчика по нашим расчетам:</span>{" "}
                              <span className={styles.value}>${item.results.finalClientPrice}</span>
                            </p>
                            <p>
                              <span className={styles.longLabel}>Цена исполнителя по нашим расчетам:</span>{" "}
                              <span className={styles.value}>${item.results.finalStreamerPrice}</span>
                            </p>
                          </div>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))
          )}
        </div>
      )}

      <BottomTabs />
    </div>
  )
}

export default ProfilePage

