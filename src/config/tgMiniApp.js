"use client";

import { useEffect } from "react";

export function useTelegramMiniApp() {
  useEffect(() => {
    // Проверяем, запущено ли приложение в Telegram
    const isTelegram = window.Telegram && window.Telegram.WebApp;

    if (isTelegram) {
      // Настраиваем Telegram Mini App
      const tg = window.Telegram.WebApp;

      // Расширяем на весь экран
      tg.expand();

      // Отключаем нативный pull-to-refresh в Telegram
      tg.setBackgroundColor("#000000");

      // Если доступно, настраиваем параметры жестов
      if (tg.MainButton) {
        // Скрываем главную кнопку, если она не нужна
        tg.MainButton.hide();
      }
    }

    // Предотвращаем оттягивание на всех устройствах
    function preventPull(e) {
      // Проверяем, находимся ли мы в верхней или нижней части страницы
      const touchY = e.touches[0].clientY;
      const touchX = e.touches[0].clientX;
      const isAtTop = window.scrollY <= 0;
      const isAtBottom =
        window.scrollY + window.innerHeight >= document.body.scrollHeight;

      // Если мы в верхней части и пытаемся тянуть вниз или
      // в нижней части и пытаемся тянуть вверх - предотвращаем действие
      if (
        (isAtTop && e.type === "touchmove" && touchY > startY) ||
        (isAtBottom && e.type === "touchmove" && touchY < startY)
      ) {
        e.preventDefault();
      }
    }

    let startY;

    function handleTouchStart(e) {
      startY = e.touches[0].clientY;
    }

    // Добавляем обработчики событий
    document.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    document.addEventListener("touchmove", preventPull, { passive: false });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", preventPull);
    };
  }, []);
}
