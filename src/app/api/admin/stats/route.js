import { NextResponse } from "next/server";
import { dbConnection } from "@/utils/dbConnection";
import { ServerSession } from "@/utils/getServerSession";

export async function GET() {
  try {
    const session = await ServerSession();

    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const db = await dbConnection();
    const totalUsers = await db.collection("users").countDocuments();
    const totalCourses = await db.collection("courses").countDocuments();

    return NextResponse.json({ totalUsers, totalCourses });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 500 }
    );
  }
}
