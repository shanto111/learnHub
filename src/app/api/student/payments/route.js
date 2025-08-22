// app/api/payments/me/route.js
import { NextResponse } from "next/server";
import { dbConnection } from "@/utils/dbConnection";
import { ServerSession } from "@/utils/getServerSession";

export async function GET() {
  try {
    const session = await ServerSession();
    if (!session || !session.user?.role === "student") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = String(session.user.id);
    const db = await dbConnection();
    const payments = await db
      .collection("payments")
      .find({ studentId: userId })
      .toArray();

    return NextResponse.json({ payments });
  } catch (err) {
    console.error("GET /api/payments/me error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
