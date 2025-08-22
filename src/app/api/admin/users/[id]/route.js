import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { dbConnection } from "@/utils/dbConnection";
import { ServerSession } from "@/utils/getServerSession";

export async function PATCH(req, { params }) {
  try {
    const session = await ServerSession();
    if (!session || session?.user?.role === "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { id } = params;
    const { role } = await req.json();

    const db = await dbConnection();
    await db
      .collection("users")
      .updateOne({ _id: new ObjectId(id) }, { $set: { role } });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const session = await ServerSession();
    if (!session?.user?.role === "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { id } = params;
    const db = await dbConnection();
    await db.collection("users").deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error: error.message },
      { status: 500 }
    );
  }
}
