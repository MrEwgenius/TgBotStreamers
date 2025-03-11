"use client";
import { useRouter, usePathname } from "next/navigation";
import styles from "./BottomTabs.module.scss";
import { Home, User, CreditCard, HelpCircle } from "lucide-react";
import { useEffect, useState } from "react";

const BottomTabs = () => {
  const [userId, setUserId] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Получаем параметры из URL
      const urlParams = new URLSearchParams(window.location.search);
      const userIdFromUrl = urlParams.get("user_id");

      const tgWebApp = window.Telegram?.WebApp;
      const tgUserId = tgWebApp?.initDataUnsafe?.user?.id;
      console.log("tgUserId:", tgUserId);

      

      const id = userIdFromUrl || tgUserId || null;
      setUserId(id);
      console.log("User ID:", id);
    }
  }, []);

  // Определяем базовые пути для сравнения с pathname
  const basePaths = {
    home: "/",
    subscription: "/subscription",
    faq: "/faq",
    profile: "/profile",
  };

  // Определяем полные пути с параметрами для навигации
  const getFullPath = (basePath) => {
    return userId ? `${basePath}?user_id=${userId}` : basePath;
  };

  const tabs = [
    { icon: Home, basePath: basePaths.home, label: "Главная" },
    { icon: CreditCard, basePath: basePaths.subscription, label: "Подписка" },
    { icon: HelpCircle, basePath: basePaths.faq, label: "Помощь" },
    { icon: User, basePath: basePaths.profile, label: "Профиль" },
  ];

  const handleNavigation = (basePath) => {
    router.push(getFullPath(basePath));
  };

  return (
    <nav className={styles.bottomNav}>
      {tabs.map(({ icon: Icon, basePath, label }) => (
        <button
          key={basePath}
          className={`${styles.navButton} ${
            pathname === basePath ? styles.active : ""
          }`}
          onClick={() => handleNavigation(basePath)}
        >
          <Icon className={styles.icon} size={24} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomTabs;
