import { configureStore } from "@reduxjs/toolkit";
import { subscriptionApi } from "./subscriptionApi";

export const store = configureStore({
  reducer: {
    [subscriptionApi.reducerPath]: subscriptionApi.reducer, // Добавляем редюсер API
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(subscriptionApi.middleware), // Подключаем middleware
});
