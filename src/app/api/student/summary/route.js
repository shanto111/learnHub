import { NextResponse } from "next/server";
import { dbConnection } from "@/utils/dbConnection";
import { ObjectId } from "mongodb";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const studentId = url.searchParams.get("studentId");
    if (!studentId)
      return NextResponse.json(
        { message: "studentId is required as query param" },
        { status: 400 }
      );

    const db = await dbConnection();
    const Enrollment = db.collection("enrollments");

    const orFilters = [{ studentId }];
    try {
      orFilters.push({ studentId: new ObjectId(studentId) });
    } catch (e) {}

    const studentFilter =
      orFilters.length > 1 ? { $or: orFilters } : orFilters[0];

    const enrolledCount = (await Enrollment.countDocuments(studentFilter)) || 0;
    const completedCount =
      (await Enrollment.countDocuments({
        ...studentFilter,
        status: "completed",
      })) || 0;

    const agg = await Enrollment.aggregate([
      { $match: studentFilter },
      {
        $group: {
          _id: null,
          totalStudyHours: { $sum: { $ifNull: ["$studyHours", 0] } },
        },
      },
    ]).toArray();
    const studyHours = agg[0]?.totalStudyHours || 0;

    const studyGoal = 50;
    const studyProgress = Math.min(
      100,
      Math.round((studyHours / Math.max(1, studyGoal)) * 100)
    );

    const summary = {
      enrolled: enrolledCount,
      completed: completedCount,
      nextQuiz: { title: "No quiz", date: null },
      studyHours,
      studyGoal,
      studyProgress,
      daysLeft: null,
    };

    return NextResponse.json(summary, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed",
        enrolled: 0,
        completed: 0,
        nextQuiz: { title: "No quiz", date: null },
        studyHours: 0,
        studyGoal: 50,
        studyProgress: 0,
        daysLeft: null,
      },
      { status: 500 }
    );
  }
}
