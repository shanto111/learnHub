// /app/api/student/courses/[id]/progress/route.js
import { dbConnection } from "@/utils/dbConnection";
import { ServerSession } from "@/utils/getServerSession";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    const { id: courseId } = params;
    const { lectureId } = await req.json();

    const session = await ServerSession();
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const studentId = session.user.id;

    const db = await dbConnection();

    // find enrollment
    const enrollment = await db.collection("enrollments").findOne({
      studentId,
      courseId,
    });

    if (!enrollment) {
      return NextResponse.json({ error: "Not enrolled" }, { status: 403 });
    }

    // add lectureId only if not present
    await db.collection("enrollments").updateOne(
      { _id: enrollment._id },
      { $addToSet: { completedLectures: lectureId } } // prevents duplicates
    );

    // Determine total lectures for this course.
    // Try two approaches: if you store lectures in a separate collection, use countDocuments.
    // If you store nested lectures inside course doc, fetch that length.
    let totalLectures = 0;

    // Attempt to find lectures collection first
    const lecturesCount = await db
      .collection("lectures")
      .countDocuments({ courseId: new ObjectId(courseId) })
      .catch(() => 0);

    if (lecturesCount && lecturesCount > 0) {
      totalLectures = lecturesCount;
    } else {
      // fallback: check if course doc has nested lectures array
      const courseDoc = await db
        .collection("courses")
        .findOne({ _id: new ObjectId(courseId) });
      if (courseDoc && Array.isArray(courseDoc.lectures)) {
        totalLectures = courseDoc.lectures.length;
      }
    }

    // Re-fetch updated enrollment
    const updatedEnrollment = await db
      .collection("enrollments")
      .findOne({ _id: enrollment._id });

    // Count how many completed lecture ids actually belong to this course's lectures.
    // If lectures stored separately, fetch their ids to match; otherwise, use intersection.
    let completedCount = 0;

    if (totalLectures > 0) {
      // Build a set of valid lecture ids for this course
      let validLectureIds = [];

      if (lecturesCount && lecturesCount > 0) {
        const courseLectures = await db
          .collection("lectures")
          .find(
            { courseId: new ObjectId(courseId) },
            { projection: { _id: 1 } }
          )
          .toArray();
        validLectureIds = courseLectures.map((l) => String(l._id));
      } else if (courseDoc && Array.isArray(courseDoc.lectures)) {
        validLectureIds = courseDoc.lectures.map((l) =>
          String(l._id || l._id?.toString?.())
        );
      }

      const completedSet = new Set(
        (updatedEnrollment.completedLectures || []).map(String)
      );
      completedCount = validLectureIds.reduce(
        (acc, id) => acc + (completedSet.has(String(id)) ? 1 : 0),
        0
      );
    } else {
      // If we couldn't determine totalLectures, fallback to length of completedLectures (safer than letting progress explode)
      completedCount = (updatedEnrollment.completedLectures || []).length;
      totalLectures = Math.max(totalLectures, completedCount); // avoid divide-by-zero
    }

    // compute progress and cap to 100
    let progress =
      totalLectures > 0
        ? Math.round((completedCount / totalLectures) * 100)
        : 0;
    if (progress > 100) progress = 100;
    if (progress < 0) progress = 0;

    await db
      .collection("enrollments")
      .updateOne({ _id: enrollment._id }, { $set: { progress } });

    const finalEnrollment = await db
      .collection("enrollments")
      .findOne({ _id: enrollment._id });

    return NextResponse.json(
      { success: true, enrollment: finalEnrollment },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
