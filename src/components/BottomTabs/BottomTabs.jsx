"use client";
import { useRouter, usePathname } from "next/navigation";
import styles from "./BottomTabs.module.scss";
import { Home, User, CreditCard, HelpCircle } from "lucide-react";

export const BottomTabs = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <div className={styles.bottomTabs}>
      <button
        className={`${styles.tabButton} ${isActive("/") ? styles.active : ""}`}
        onClick={() => router.push("/")}
      >
        <Home size={24} />
        <span>Главная</span>
      </button>
      <button
        className={`${styles.tabButton} ${
          isActive("/profile") ? styles.active : ""
        }`}
        onClick={() => router.push("/profile")}
      >
        <User size={24} />
        <span>Профиль</span>
      </button>
      <button
        className={`${styles.tabButton} ${
          isActive("/subscription") ? styles.active : ""
        }`}
        onClick={() => router.push("/subscription")}
      >
        <CreditCard size={24} />
        <span>Подписка</span>
      </button>
      <button
        className={`${styles.tabButton} ${
          isActive("/faq") ? styles.active : ""
        }`}
        onClick={() => router.push("/faq")}
      >
        <HelpCircle size={24} />
        <span>FAQ</span>
      </button>
    </div>
  );
};
