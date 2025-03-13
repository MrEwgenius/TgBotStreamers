'use client'
import {  useEffect } from "react";
import { useSearchParams } from "next/navigation";

export const SearchParamsLogger = () => {
  const searchParams = useSearchParams();
  console.log(111);
  

  useEffect(() => {
    const orderId = searchParams.get("order_id");
    const status = searchParams.get("status");

    if (orderId && status) {
      console.log(`CryptoCloud Postback: Order ID: ${orderId}, Status: ${status}`);
    }
  }, [searchParams]);

  return null; // Ничего не рендерим
};

export default function Home() {
  return (
    <div>
        <SearchParamsLogger />
    </div>
  );
}
