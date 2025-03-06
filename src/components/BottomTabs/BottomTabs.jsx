"use client";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import styles from "./BottomTabs.module.scss";
import { Home, User, CreditCard, HelpCircle } from "lucide-react";

const BottomTabs = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [activeTab, setActiveTab] = useState("/");

  const handleNavigation = (path) => {
    setActiveTab(path);
    router.push(path);
  };

  return (
    <nav className={styles.bottomNav}>
      {[
        { icon: Home, path: "/", label: "Главная" },
        { icon: CreditCard, path: "/subscription", label: "Подписка" },
        { icon: HelpCircle, path: "/faq", label: "FAQ" },
        { icon: User, path: "/profile", label: "Профиль" },
      ].map(({ icon: Icon, path, label }) => (
        <button
          key={path}
          className={`${styles.navButton} ${
            pathname === path ? styles.active : ""
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
