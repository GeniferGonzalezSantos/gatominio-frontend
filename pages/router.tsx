"use client";
import { useRouter } from "next/navigation";

export default function Router() {
  const router = useRouter();
  router.push("/Profile_Id");
  router.push("/Register");
}
