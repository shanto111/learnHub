import { NextResponse } from "next/server";
import { dbConnection } from "@/utils/dbConnection";
import { ServerSession } from "@/utils/getServerSession";

export async function GET(req) {
  try {
    const session = await ServerSession();
    if (!session?.user?.role === "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const db = await dbConnection();
    const users = await db
      .collection("users")
      .find()
      .project({ password: 0 })
      .toArray();

    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error", error: error.message },
      { status: 500 }
    );
  }
}
