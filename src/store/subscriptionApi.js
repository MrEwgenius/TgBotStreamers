import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const subscriptionApi = createApi({
  reducerPath: "subscriptionApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://holstenmain.com/api" }), // Базовый URL API
  endpoints: (builder) => ({
    checkSubscription: builder.query({
      query: (chat_id) => ({
        url: "/checkSub", // Достаточно относительного пути
        method: "POST",
        body: { chat_id: String(chat_id) }, // Упрощённая запись
      }),
      transformResponse: (response) => ({
        status: response.status,
        expires_at: response.expires_at || null,
      }),
    }),
  }),
});

export const { useCheckSubscriptionQuery } = subscriptionApi;
