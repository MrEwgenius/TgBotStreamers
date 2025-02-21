"use client";
import React, { useState } from "react";
import styles from "./page.module.scss";

const Profile = () => {
  const subscriptionEndDate = "2025-03-10"; 
  const [history, setHistory] = useState([
    { id: 1, input: "5 + 10", result: "15", date: "10.02.2025" },
    { id: 2, input: "20 * 3", result: "60", date: "09.02.2025" },
    { id: 3, input: "100 / 4", result: "25", date: "08.02.2025" },
  ]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Профиль</h2>

      <div className={styles.subscription}>
        <p>
          Подписка активна до:
          <span className={styles.date}> {subscriptionEndDate}</span>
        </p>
      </div>

      <h3 className={styles.subtitle}>История калькулятора</h3>
      <div className={styles.history}>
        <p className={styles.noHistory}>История пуста</p>
      </div>
    </div>
  );
};

export default Profile;
