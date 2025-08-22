import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { dbConnection } from "@/utils/dbConnection";
import { ServerSession } from "@/utils/getServerSession";

export async function PATCH(req, { params }) {
  try {
    const id = params?.id;
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid id" }, { status: 400 });
    }

    const session = await ServerSession();
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const update = {};
    if (typeof body.status === "string") update.status = body.status;
    if (typeof body.note === "string") update.adminNote = body.note;

    const db = await dbConnection();
    const result = await db
      .collection("courses")
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { ...update, reviewedAt: new Date() } }
      );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Server Error", error: String(error?.message || error) },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const id = params?.id;
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid id" }, { status: 400 });
    }

    const session = await ServerSession();
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const db = await dbConnection();
    const result = await db
      .collection("courses")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Server Error", error: String(error?.message || error) },
      { status: 500 }
    );
  }
}
