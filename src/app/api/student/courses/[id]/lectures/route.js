import { dbConnection } from "@/utils/dbConnection";
import { ObjectId } from "mongodb";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");

    if (!courseId) {
      return new Response(JSON.stringify({ error: "courseId required" }), {
        status: 400,
      });
    }

    const db = await dbConnection();
    const lecturesCollection = db.collection("lectures");

    const courseLectures = await lecturesCollection.findOne({
      courseId: new ObjectId(courseId),
    });

    return new Response(
      JSON.stringify({ lectures: courseLectures?.lectures || [] }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("GET /api/teacher/lectures error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { lectureId } = params; // lectureId path থেকে
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");

    if (!courseId || !lectureId) {
      return new Response(
        JSON.stringify({ error: "courseId & lectureId required" }),
        {
          status: 400,
        }
      );
    }

    const db = await dbConnection();
    const lecturesCollection = db.collection("lectures");

    // lectureId কে lecture array থেকে pull করা
    const result = await lecturesCollection.updateOne(
      { courseId: new ObjectId(courseId) },
      { $pull: { lectures: { _id: new ObjectId(lectureId) } } }
    );

    if (result.modifiedCount === 0) {
      return new Response(
        JSON.stringify({ error: "Lecture not found or already deleted" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("DELETE /api/teacher/lectures error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
