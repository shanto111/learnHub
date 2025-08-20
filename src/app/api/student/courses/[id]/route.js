import { dbConnection } from "@/utils/dbConnection";
import { ServerSession } from "@/utils/getServerSession";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const session = await ServerSession();
    if (!session || session.user.role !== "student") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id: courseId } = params;
    const db = await dbConnection();

    // check if enrolled
    const enrolled = await db.collection("enrollments").findOne({
      studentId: session.user.id,
      courseId: courseId,
    });

    if (!enrolled) {
      return NextResponse.json({ error: "Not enrolled" }, { status: 403 });
    }

    // get lectures for that course
    const lectures = await db
      .collection("lectures")
      .find({ courseId: new ObjectId(courseId) })
      .toArray();

    return NextResponse.json(lectures);
  } catch (error) {
    console.error("Error fetching lectures:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
