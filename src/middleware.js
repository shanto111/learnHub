import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const pathname = req.nextUrl.pathname;
  const secret = process.env.NEXTAUTH_SECRET;

  // Get JWT token from cookies
  const token = await getToken({ req, secret });

  console.log("Middleware called!");
  console.log("Pathname:", pathname);
  console.log("Token exists?", !!token);

  // If no token, redirect to login
  if (!token) {
    console.log("No token found. Redirecting to /login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Admin route protection
  if (pathname.startsWith("/dashboard/admin") && token.role !== "admin") {
    console.log("User role is not admin. Redirecting to /dashboard/student");
    return NextResponse.redirect(new URL("/dashboard/student", req.url));
  }

  // Teacher route protection
  if (pathname.startsWith("/dashboard/teacher") && token.role !== "teacher") {
    console.log("User role is not teacher. Redirecting to /dashboard/student");
    return NextResponse.redirect(new URL("/dashboard/student", req.url));
  }

  // Student route protection
  if (pathname.startsWith("/dashboard/student") && token.role !== "student") {
    console.log("User role is not student. Redirecting to /dashboard/student");
    return NextResponse.redirect(new URL("/dashboard/student", req.url));
  }

  console.log("Access granted to:", pathname);
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
