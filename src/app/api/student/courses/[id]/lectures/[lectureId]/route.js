import { dbConnection } from "@/utils/dbConnection";
import { ServerSession } from "@/utils/getServerSession";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    const session = await ServerSession();
    if (!session || session.user.role !== "student") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { courseId, lectureId } = params;
    const db = await dbConnection();

    // ensure lecture exists
    const lecture = await db.collection("lectures").findOne({
      _id: new ObjectId(lectureId),
      courseId: new ObjectId(courseId),
    });
    if (!lecture) {
      return NextResponse.json({ error: "Lecture not found" }, { status: 404 });
    }

    // get enrollment
    const enrollment = await db.collection("enrollments").findOne({
      studentId: session.user.id,
      courseId: new ObjectId(courseId),
    });
    if (!enrollment) {
      return NextResponse.json({ error: "Not enrolled" }, { status: 403 });
    }

    const lectureObjectId = new ObjectId(lectureId);

    // add lectureId if not already completed
    await db
      .collection("enrollments")
      .updateOne(
        { _id: enrollment._id },
        { $addToSet: { completedLectures: lectureObjectId } }
      );

    // recalc progress
    const totalLectures = await db
      .collection("lectures")
      .countDocuments({ courseId: new ObjectId(courseId) });

    const updatedEnrollment = await db
      .collection("enrollments")
      .findOne({ _id: enrollment._id });

    const completedCount = (updatedEnrollment.completedLectures || []).length;
    const newProgress =
      totalLectures > 0
        ? Math.round((completedCount / totalLectures) * 100)
        : 0;

    await db
      .collection("enrollments")
      .updateOne({ _id: enrollment._id }, { $set: { progress: newProgress } });

    return NextResponse.json({
      ok: true,
      progress: newProgress,
      completedCount,
      totalLectures,
    });
  } catch (error) {
    console.error("Error marking lecture complete:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
