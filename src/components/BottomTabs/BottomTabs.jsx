"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./BottomTabs.module.scss";
import { Home, User, CreditCard, HelpCircle } from "lucide-react";

const BottomTabs = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("/");

  const handleNavigation = (path) => {
    setActiveTab(path);
    router.push(path);
  };

  return (
    <nav className={styles.bottomNav}>
      {[
        { icon: Home, path: "/", label: "Главная" },
        { icon: User, path: "/profile", label: "Профиль" },
        { icon: CreditCard, path: "/subscription", label: "Подписка" },
        { icon: HelpCircle, path: "/faq", label: "FAQ" },
      ].map(({ icon: Icon, path, label }) => (
        <button
          key={path}
          className={`${styles.navButton} ${
            activeTab === path ? styles.active : ""
          }`}
          onClick={() => handleNavigation(path)}
        >
          <Icon size={24} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomTabs;
