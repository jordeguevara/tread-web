"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/workouts"); // Redirect to the /workouts page
  }, [router]);
  return <div className="bg-white text-black"></div>;
}
