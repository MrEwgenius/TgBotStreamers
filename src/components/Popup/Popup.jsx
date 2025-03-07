"use client";

import styles from "./Popup.module.scss";
import { Check } from "lucide-react";

export const Popup = ({ onClose }) => {
  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <h2 className={styles.title}>
          Получи доступ к премиальному контенту 💰
        </h2>

        <p className={styles.subtitle}>Первый месяц подписки <span>БЕСПЛАТНО</span></p>

        <div className={styles.featureList}>
          <div className={styles.featureItem}>
            <span className={styles.checkIcon}>
              <Check size={14} />
            </span>
            Доступ к основным функциям
          </div>

          <div className={styles.featureItem}>
            <span className={styles.checkIcon}>
              <Check size={14} />
            </span>
            Ограниченное кол-во запросов
          </div>

          <div className={styles.featureItem}>
            <span className={styles.checkIcon}>
              <Check size={14} />
            </span>
            Базовая поддержка
          </div>
        </div>

        <button onClick={onClose} className={styles.button}>
          Выбрать план
        </button>
      </div>
    </div>
  );
};
