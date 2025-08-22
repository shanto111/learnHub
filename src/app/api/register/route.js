import { dbConnection } from "@/utils/dbConnection";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, password, role } = body;

    if (!name || !email || !password || !role) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const allowed = ["student", "teacher", "admin"];
    if (!allowed.includes(role)) {
      return NextResponse.json({ message: "Invalid role" }, { status: 400 });
    }
    const db = await dbConnection();
    const users = db.collection("users");

    const exists = await users.findOne({ email: email.toLowerCase() });
    if (exists) {
      return NextResponse.json(
        { message: "Email already in use" },
        { status: 409 }
      );
    }

    const hashed = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email: email.toLowerCase(),
      password: hashed,
      role,
      createdAt: new Date(),
    };

    const result = await users.insertOne(newUser);

    return NextResponse.json(
      { message: "User created", id: result.insertedId },
      { status: 201 }
    );
  } catch (err) {
    console.error("Register error", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
