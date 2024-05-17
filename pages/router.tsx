"use client";
import { useRouter } from "next/navigation";

export default function Router() {
  const router = useRouter();
  if (typeof window !== "undefined") {
    router.push("/Profile_Id");
    router.push("/Register");
  }
}
