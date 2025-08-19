"use client";

import { useSession } from "next-auth/react";
import Navbar from "./Shared/Navbar";

export default function NoHeaderFooter({ children }) {
  const { data: session, status } = useSession();
  console.log(session);
  if (status === "loading") return null;

  const role = session?.user?.role;
  console.log("role", role);
  const isDashboardRole =
    role === "admin" || role === "student" || role === "teacher";

  return (
    <div>
      {!isDashboardRole && <Navbar></Navbar>}
      <main className="min-h-screen">{children}</main>
    </div>
  );
}
