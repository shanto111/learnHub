// app/api/payments/success/route.js
console.log("📡 route loaded: /api/payments/success");

import { NextResponse } from "next/server";

export async function GET(req) {
  console.log("📡 /api/payments/success GET hit (minimal)");
  const url = new URL(req.url);
  const sessionId = url.searchParams.get("session_id") || null;
  return NextResponse.json({
    ok: true,
    debug: "minimal",
    sessionId,
    now: new Date().toISOString(),
  });
}
