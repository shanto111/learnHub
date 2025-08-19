import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { dbConnection } from "@/utils/dbConnection";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "teacher") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const teacherId = session?.user?.id;
    const db = await dbConnection();

    const courses = await db
      .collection("courses")
      .find({
        teacherId: teacherId,
      })
      .toArray();

    return NextResponse.json(courses);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
