"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useSearchParams } from "next/navigation";
import BottomTabs from "@/components/BottomTabs/BottomTabs";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("history"); // По умолчанию открыта вкладка История
  const [history, setHistory] = useState([]);
  const [expandedItem, setExpandedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const userIdFromUrl = searchParams.get("user_id");
  // const userIdFromUrl = 13;
  console.log(userIdFromUrl);

  const subscriptionInfo = {
    plan: "Продвинутый",
    endDate: "31.12.2025",
  };

  // Функция для группировки расчетов по дате
  const groupCampaignsByDate = (campaigns) => {
    const groupedData = {};

    campaigns.forEach((campaign) => {
      // Получаем дату из строки created_at
      const date = new Date(campaign.created_at);
      const dateKey = date.toISOString().split("T")[0]; // Формат YYYY-MM-DD

      // Если для этой даты еще нет группы, создаем ее
      if (!groupedData[dateKey]) {
        groupedData[dateKey] = {
          date: dateKey,
          items: [],
        };
      }

      // Добавляем кампанию в соответствующую группу
      groupedData[dateKey].items.push({
        streamerName: extractStreamerNickname(
          campaign.streamer_link || "streamer"
        ),
        streamerLink: campaign.streamer_link,
        results: {
          clientPrice: campaign.client_price,
          avgFtdAmount: campaign.avg_ftd_amount,
          pricePerPlayer: campaign.price_per_player,
          priceDifference: campaign.price_difference,
          proposedDiscount: campaign.proposed_discount,
          finalClientPrice: campaign.final_client_price,
          finalStreamerPrice: campaign.final_streamer_price,
        },
      });
    });

    // Преобразуем объект в массив и сортируем по дате (от новых к старым)
    return Object.values(groupedData).sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
  };

  // Функция для извлечения никнейма стримера из ссылки
  const extractStreamerNickname = (url) => {
    if (!url) return "streamer";

    try {
      // Удаляем протокол и домен, оставляем только путь
      const path = url.replace(/^https?:\/\/(www\.)?[^/]+\//, "");
      // Возвращаем последнюю часть пути как никнейм
      return path.split("/").pop() || "streamer";
    } catch (error) {
      return "streamer";
    }
  };

  // Загрузка данных с API
  useEffect(() => {
    const fetchCampaigns = async () => {
      if (!userIdFromUrl) {
        console.error("Отсутствует user_id в URL параметрах");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const response = await fetch("https://holstenmain.com/api/getCampaigns", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: Number.parseInt(userIdFromUrl),
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Группируем данные по дате
        const groupedData = groupCampaignsByDate(data);
        setHistory(groupedData);

        // Устанавливаем первый элемент как развернутый, если есть данные
        if (groupedData.length > 0 && groupedData[0].items.length > 0) {
          setExpandedItem(`${groupedData[0].date}-0`);
        }
      } catch (error) {
        console.error("Ошибка при загрузке истории:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, [userIdFromUrl]);

  const toggleExpand = (dateIndex, itemIndex) => {
    const itemKey = `${history[dateIndex].date}-${itemIndex}`;
    setExpandedItem(expandedItem === itemKey ? null : itemKey);
  };

  // Функция для форматирования даты (только день и месяц)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("ru", { month: "long" });
    return `${day} ${month}`;
  };

  return (
    <div className={styles.profileContainer}>
      <h1 className={styles.title}>
        Ваш профиль
        <span className={styles.userIcon}>👤</span>
      </h1>

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
          {loading ? (
            <p>Загрузка истории...</p>
          ) : history.length === 0 ? (
            <p>История пуста</p>
          ) : (
            history.map((dateGroup, dateIndex) => (
              <div key={dateGroup.date} className={styles.dateGroup}>
                <h3 className={styles.dateLabel}>
                  {formatDate(dateGroup.date)}
                </h3>
                <ul className={styles.historyList}>
                  {dateGroup.items.map((item, itemIndex) => {
                    const itemKey = `${dateGroup.date}-${itemIndex}`;
                    const isExpanded = expandedItem === itemKey;

                    return (
                      <li key={itemKey} className={styles.historyItem}>
                        <div
                          className={styles.historyHeader}
                          onClick={() => toggleExpand(dateIndex, itemIndex)}
                        >
                          <span className={styles.streamerName}>
                            {item.streamerName}
                          </span>
                          {isExpanded ? (
                            <ChevronUp size={24} />
                          ) : (
                            <ChevronDown size={24} />
                          )}
                        </div>

                        {isExpanded && (
                          <div className={styles.historyDetails}>
                            <p>
                              <span>Цена заказчика:</span>
                              <span>${item.results.clientPrice}</span>
                            </p>
                            <p>
                              <span>Средняя сумма чека одного FTD:</span>
                              <span>${item.results.avgFtdAmount}</span>
                            </p>
                            <p>
                              <span>Цена 1 игрока:</span>
                              <span>${item.results.pricePerPlayer}</span>
                            </p>
                            <p>
                              <span>Отличие цены:</span>
                              <span>{item.results.priceDifference}%</span>
                            </p>
                            <p>
                              <span>
                                Предлагаемое уменьшение цены стримера:
                              </span>
                              <span>{item.results.proposedDiscount}%</span>
                            </p>
                            <p>
                              <span>Цена заказчика по нашим расчетам:</span>
                              <span>${item.results.finalClientPrice}</span>
                            </p>
                            <p>
                              <span>Цена исполнителя по нашим расчетам:</span>
                              <span>${item.results.finalStreamerPrice}</span>
                            </p>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))
          )}
        </div>
      )}

      <BottomTabs />
    </div>
  );
};

export default ProfilePage;
