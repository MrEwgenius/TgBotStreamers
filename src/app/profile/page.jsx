'use client';
import styles from "./page.module.scss";

const ProfilePage = () => {
  const subscriptionEndDate = "31 декабря 2023";
  const usageHistory = [
    // { date: "2023-06-01", action: "Вход в приложение" },
    // { date: "2023-06-02", action: "Обновление профиля" },
    // { date: "2023-06-03", action: "Просмотр FAQ" },
    // { date: "2023-06-04", action: "Изменение подписки" },
  ];

  return (
    <div className={styles.profileContainer}>
      <h1>Профиль</h1>
      <div className={styles.subscriptionInfo}>
        <h2>Информация о подписке</h2>
        <p>Ваша подписка действует до: {subscriptionEndDate}</p>
      </div>
      <div className={styles.usageHistory}>
        <h2>История использования:</h2>
        <ul>
          {usageHistory.map((item, index) => (
            <li key={index}>
              <span>{item.date}</span>
              <span>{item.action}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfilePage;
