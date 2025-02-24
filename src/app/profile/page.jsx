"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { Calendar, ChevronDown, ChevronUp, Clock } from "lucide-react";
import { extractStreamerNickname } from "@/config/extractStreamerNickname";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("subscription");

  const subscriptionInfo = {
    plan: "Продвинутый",
    endDate: "31 декабря 2025",
  };
  const [history, setHistory] = useState([]);
  const [expandedItem, setExpandedItem] = useState(null);

  useEffect(() => {
    const storedHistory = JSON.parse(
      localStorage.getItem("calculationHistory") || "[]"
    );
    if (storedHistory) {
      setHistory(storedHistory);
    }
  }, []);

  const toggleExpand = (index) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  

  return (
    <div className={styles.profileContainer}>
      <h1>Профиль пользователя</h1>
      <div className={styles.tabContainer}>
        <button
          className={`${styles.tabButton} ${
            activeTab === "subscription" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("subscription")}
        >
          Подписка
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "history" ? styles.active : ""
          }`}
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
        <div className={styles.historyContainer}>
          <h3>История расчетов</h3>
          {history.length === 0 ? (
            <p>История пуста</p>
          ) : (
            <ul className={styles.historyList}>
              {history &&
                history.map((item, index) => (
                  <li key={index} className={styles.historyItem}>
                    <div
                      className={styles.historyHeader}
                      onClick={() => toggleExpand(index)}
                    >
                     <div className={styles.headerContent}>
                        <span className={styles.streamerNickname}>
                          {extractStreamerNickname(item.streamerLink)}
                        </span>
                        <span className={styles.calculationDate}>
                          {new Date(item.date).toLocaleDateString()}
                        </span>
                     </div>
                      {expandedItem === index ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </div>
                    {expandedItem === index && (
                      <div className={styles.historyDetails}>
                        <p>
                          <span>Стример:</span> {item.streamerLink}
                        </p>
                        <p>
                          <span>Цена заказчика:</span>{" "}
                          <span>{item.results.clientPrice} $</span>
                        </p>
                        <p>
                          <span>Средняя сумма чека одного FTD:</span>{" "}
                         <span> {item.results.avgFtdAmount} $</span>
                        </p>
                        <p>
                          <span>Цена 1 игрока:</span>{" "}
                         <span> {item.results.pricePerPlayer} $</span>
                        </p>
                        <p>
                          <span>Отличие цены:</span>{" "}
                         <span> {item.results.priceDifference} %</span>
                        </p>
                        <p>
                          <span>
                            Предлагаемое уменьшение цены стримера:
                          </span>{" "}
                         <span> {item.results.proposedDiscount} %</span>
                        </p>
                        <p>
                          <span>Цена заказчика по нашим расчетам:</span>{" "}
                          <span>{item.results.finalClientPrice} $</span>
                        </p>
                        <p>
                          <span>Цена исполнителя по нашим расчетам:</span>{" "}
                          <span>{item.results.finalStreamerPrice} $</span>
                        </p>
                      </div>
                    )}
                  </li>
                ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
