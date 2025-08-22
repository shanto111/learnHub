import { NextResponse } from "next/server";
import { dbConnection } from "@/utils/dbConnection";
import { ServerSession } from "@/utils/getServerSession";

export async function GET(req) {
  try {
    const session = await ServerSession();
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const db = await dbConnection();
    const payments = await db.collection("payments").find({}).toArray();

    return NextResponse.json({ payments });
  } catch (err) {
    console.error("GET /api/payments/admin error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
