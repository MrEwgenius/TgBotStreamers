"use client";
import { useRouter, usePathname } from "next/navigation";
import styles from "./BottomTabs.module.scss";
import { Home, User, CreditCard, HelpCircle } from "lucide-react";
import { useEffect, useState } from "react";

const BottomTabs = () => {
  const [userId, setUserId] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (path) => {
    router.push(path);
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Получаем параметры из URL
      const urlParams = new URLSearchParams(window.location.search);
      const userIdFromUrl = urlParams.get("user_id");

      // Если есть Telegram WebApp, можно также получить ID пользователя оттуда
      const tgWebApp = window.Telegram?.WebApp;
      const tgUserId = tgWebApp?.initDataUnsafe?.user?.id;

      // Используем ID из URL или из Telegram WebApp
      const id = userIdFromUrl || tgUserId || null;
      setUserId(id);
      console.log("User ID:", id);
    }
  }, []);

  const tabs = [
    { icon: Home, path: `/?user_id=${userId}`, label: "Главная" },
    {
      icon: CreditCard,
      path: `/subscription?user_id=${userId}`,
      label: "Подписка",
    },
    { icon: HelpCircle, path: `/faq?user_id=${userId}`, label: "Помощь" },
    { icon: User, path: `/profile?user_id=${userId}`, label: "Профиль" },
  ];

  return (
    <nav className={styles.bottomNav}>
      {tabs.map(({ icon: Icon, path, label }) => (
        <button
          key={path}
          className={`${styles.navButton} ${
            pathname === path ? styles.active : ""
          }`}
          onClick={() => handleNavigation(path)}
        >
          <Icon className={styles.icon} size={24} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomTabs;
