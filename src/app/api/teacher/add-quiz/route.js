import { dbConnection } from "@/utils/dbConnection";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { title, questions, courseId } = body;

    if (!title || !questions?.length || !courseId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const db = await dbConnection();
    const quizzes = db.collection("quizzes");

    const result = await quizzes.insertOne({
      title,
      questions,
      courseId,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "Quiz created successfully", id: result.insertedId },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error saving quiz:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("quizDB");
    const quizzes = await db.collection("quizzes").find().toArray();

    return NextResponse.json(quizzes);
  } catch (err) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
