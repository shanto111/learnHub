"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    // যদি user login না করে থাকে
    if (status === "unauthenticated") {
      router.replace("/login");
      return;
    }

    const role = session?.user?.role;

    if (role === "admin") {
      router.replace("/dashboard/admin");
    } else if (role === "teacher") {
      router.replace("/dashboard/teacher");
    } else if (role === "student") {
      router.replace("/dashboard/student");
    } else {
      // unknown role
      router.replace("/login");
    }
  }, [session, status, router]);

  return <p className="text-center mt-10">Redirecting to your dashboard...</p>;
}
