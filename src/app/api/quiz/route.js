import { NextResponse } from "next/server";
import { dbConnection } from "@/utils/dbConnection";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const courseId = url.searchParams.get("courseId");

    if (!courseId) {
      return NextResponse.json(
        { error: "Course ID not found" },
        { status: 400 }
      );
    }

    const db = await dbConnection();
    const quizzes = await db.collection("quiz").find({ courseId }).toArray();

    return NextResponse.json(quizzes, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
