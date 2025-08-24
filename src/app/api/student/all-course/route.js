import { NextResponse } from "next/server";
import { dbConnection } from "@/utils/dbConnection";

export async function GET(req) {
  try {
    const db = await dbConnection();

    const courses = await db.collection("courses").find().toArray();

    return NextResponse.json(courses);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
