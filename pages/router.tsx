"use client";
import { useRouter } from "next/navigation";

export default function router() {
  const router = useRouter();
  router.push("/Profile_Id");
  router.push("/Register");
}
