import { NextResponse } from "next/server";
import { dbConnection } from "@/utils/dbConnection";
import { ServerSession } from "@/utils/getServerSession";

export async function GET(req) {
  try {
    const session = await ServerSession();
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
    const db = await dbConnection();
    const courses = await db.collection("courses").find().toArray();
    return NextResponse.json({ courses });
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error", error: error.message },
      { status: 500 }
    );
  }
}
