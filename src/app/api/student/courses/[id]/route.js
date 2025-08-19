import { dbConnection } from "@/utils/dbConnection";
import { ServerSession } from "@/utils/getServerSession";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  const courseId = req.params;
  console.log("courseid", courseId);

  // Get user session
  const session = await ServerSession();
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Connect to DB
  const db = await dbConnection();

  // Check if student is enrolled in the course
  const enrolled = await db.collection("enrollments").findOne({
    studentId: session.user.id,
    courseId: new ObjectId(courseId),
  });

  if (!enrolled) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Get all lectures for this course
  const lectures = await db
    .collection("lectures")
    .find({ courseId: new ObjectId(courseId) })
    .toArray();

  return NextResponse.json(lectures, { status: 200 });
}
