"use client";

import { useSearchParams } from "next/navigation";

export default function SearchParamsComponent() {
    const searchParams = useSearchParams();
    const userIdFromUrl = searchParams.get("user_id");

  return <div>Параметры: {userIdFromUrl}</div>;
}
