import { dbConnection } from "@/utils/dbConnection";

export async function POST(req) {
  try {
    const courseData = await req.json();
    console.log("Course Data", courseData);

    const db = await dbConnection();
    const result = await db.collection("courses").insertOne(courseData);

    return new Response(
      JSON.stringify({ message: "Course added successfully", result }),
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Server error", error }), {
      status: 500,
    });
  }
}
