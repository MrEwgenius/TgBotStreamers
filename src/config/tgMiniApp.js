"use client";

import { useEffect } from "react";

export function useTelegramViewport() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;

      // Устанавливаем высоту вьюпорта
      const setViewportHeight = () => {
        const vh = tg.viewportHeight || window.innerHeight;
        const stableVh = tg.viewportStableHeight || window.innerHeight;

        document.documentElement.style.setProperty(
          "--tg-viewport-height",
          `${vh}px`
        );
        document.documentElement.style.setProperty(
          "--tg-viewport-stable-height",
          `${stableVh}px`
        );
      };

      // Устанавливаем начальные значения
      setViewportHeight();

      // Слушаем изменения вьюпорта
      tg.onEvent("viewportChanged", setViewportHeight);

      // Очистка при размонтировании
      return () => {
        tg.offEvent("viewportChanged", setViewportHeight);
      };
    }
  }, []);
}
