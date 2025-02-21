"use client"; 
import { useRouter } from "next/navigation";
import styles from "./BottomTabs.module.scss";

export const BottomTabs = () => {
  const router = useRouter();

  return (
    <div className={styles.bottomTabs}>
      <button className={styles.tabButton} onClick={() => router.push("/")}>
        <img
          src="https://img.icons8.com/?size=30&id=73&format=png&color=ffffff"
          alt="home"
        />
        <span> Главная</span>
      </button>
      <button
        className={styles.tabButton}
        onClick={() => router.push("/profile")}
      >
        <img
          src="https://img.icons8.com/?size=30&id=23400&format=png&color=ffffff"
          alt="profile"
        />
        <span>Профиль</span>
      </button>
      <button
        className={styles.tabButton}
        onClick={() => router.push("/subscription")}
      >
        <img
          src="https://img.icons8.com/?size=30&id=46217&format=png&color=ffffff"
          alt="subscribe"
        />
        <span> Подписка</span>
      </button>
      <button className={styles.tabButton} onClick={() => router.push("/faq")}>
        <img
          src="https://img.icons8.com/?size=25&id=10568&format=png&color=ffffff"
          alt="questions"
        />
        <span> FAQ</span>
      </button>
    </div>
  );
};
