import styles from "./Popup.module.scss";

export const Popup = ({ onClose }) => {
  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <h2>Начни бесплатно – получи доступ к премиальному контенту</h2>
        <p>
          🔹 Подписка на месяц – <span className={styles.strikeThrough}>$9.99</span>{" "}
          → <span className={styles.freeHighlight}>БЕСПЛАТНО на первый месяц!</span>
        </p>
        <p>🔹 Подписка на год – $99.9</p>
        <h3>⚡ Как это работает?</h3>
        <div className={styles.infoContainer}>
          <p>1️⃣ Подпишись и получи доступ без оплаты на первый месяц</p>
          <p>
            2️⃣ Вся важная информация и уведомления приходят через Telegram-бот
          </p>
        </div>
        <button onClick={onClose} className={styles.popupCloseButton}>
          Закрыть
        </button>
      </div>
    </div>
  );
};
