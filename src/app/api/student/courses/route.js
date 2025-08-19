import { dbConnection } from "@/utils/dbConnection";
import { ServerSession } from "@/utils/getServerSession";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const session = await ServerSession();
    if (!session) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const db = await dbConnection();

    const enrollments = await db
      .collection("enrollments")
      .find({ studentId: session.user.id })
      .toArray();

    const courseIds = enrollments.map(
      (enroll) => new ObjectId(enroll.courseId)
    );

    const courses = await db
      .collection("courses")
      .find({ _id: { $in: courseIds } })
      .toArray();

    const mergedCourses = courses.map((course) => {
      const enrollment = enrollments.find(
        (enroll) => String(enroll.courseId) === String(course._id)
      );
      return { ...course, enrollment: enrollment || null };
    });

    return NextResponse.json(mergedCourses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
