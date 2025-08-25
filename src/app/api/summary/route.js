import { NextResponse } from "next/server";
import { dbConnection } from "@/utils/dbConnection";

export async function GET() {
  try {
    const db = await dbConnection();
    const courses = db.collection("courses");
    const users = db.collection("users");

    const totalCourses = await courses.countDocuments();
    const totalStudents = await users.countDocuments({ role: "student" });
    const totalTeachers = await users.countDocuments({ role: "teacher" });

    const categories = await courses
      .aggregate([
        { $group: { _id: "$category", count: { $sum: 1 } } },
        { $project: { _id: 0, category: "$_id", count: 1 } },
        { $sort: { count: -1 } },
      ])
      .toArray();

    return NextResponse.json({
      success: true,
      data: { totalCourses, totalStudents, totalTeachers, categories },
    });
  } catch (err) {
    console.error("GET /api/summary error:", err);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
