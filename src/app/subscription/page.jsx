"use client";
import React, { useState } from "react";
import styles from "./page.module.scss";

const plans = [
  { id: 1, name: "Разовый расчёт", price: "50₽", description: "Один расчёт в калькуляторе." },
  { id: 2, name: "Про", price: "300₽", description: "Безлимитные расчёты на 3 дня." },
  { id: 3, name: "Премиум", price: "900₽", description: "Безлимитные расчёты на 30 дней." },
];

const Subscription = () => {
  const [activePlan, setActivePlan] = useState(null);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Ваш текущий тариф</h2>
      <div className={styles.activePlan}>
        {activePlan ? (
          <>
            <h3>{activePlan.name}</h3>
            <p className={styles.price}>{activePlan.price}</p>
            <p className={styles.description}>{activePlan.description}</p>
          </>
        ) : (
          <p className={styles.noPlan}>Активного тарифа нет</p>
        )}
      </div>

      <h2 className={styles.title}>Выберите тариф</h2>
      <div className={styles.plans}>
        {plans.map((plan) => (
          <div key={plan.id} className={styles.plan} onClick={() => setActivePlan(plan)}>
            <h3>{plan.name}</h3>
            <p className={styles.price}>{plan.price}</p>
            <p className={styles.description}>{plan.description}</p>
            <button className={styles.selectBtn}>Выбрать</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscription;
