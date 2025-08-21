"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function DashboardLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "authenticated") {
      const role = session?.user?.role;

      if (pathname === "/dashboard") {
        if (role === "admin") {
          router.push("/dashboard/admin");
        } else if (role === "teacher") {
          router.push("/dashboard/teacher");
        } else if (role === "student") {
          router.push("/dashboard/student");
        } else {
          router.push("/login");
        }
      }
    }

    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [session, status, router, pathname]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
}
