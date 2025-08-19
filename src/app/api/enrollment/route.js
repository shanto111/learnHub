// app/api/enrollment/route.js
import { NextResponse } from "next/server";
import { dbConnection } from "@/utils/dbConnection";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { sessionId } = body || {};

    if (!sessionId) {
      return NextResponse.json(
        { success: false, error: "Missing sessionId" },
        { status: 400 }
      );
    }

    // DB connect - dbConnection should return the DB instance (client.db("yourDB"))
    const db = await dbConnection();
    if (!db) {
      console.error("DB connection failed");
      return NextResponse.json(
        { success: false, error: "DB connection failed" },
        { status: 500 }
      );
    }

    // Verify payment session with Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Session not found" },
        { status: 404 }
      );
    }

    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { success: false, error: "Payment not completed" },
        { status: 400 }
      );
    }

    // Idempotency: check existing enrollment by sessionId
    const enrollmentsColl = db.collection("enrollments");
    const existing = await enrollmentsColl.findOne({ sessionId });
    if (existing) {
      return NextResponse.json({
        success: true,
        message: "Already enrolled",
        enrollment: existing,
      });
    }

    // Build enrollment object (take metadata from session)
    const enrollmentData = {
      userEmail:
        session.customer_details?.email || session.customer_email || "",
      courseId: session.metadata?.courseId || "",
      studentId: session.metadata?.studentId || "",
      sessionId,
      amount: session.amount_total ? session.amount_total / 100 : 0,
      status: "active",
      purchaseDate: new Date(),
      progress: 0,
      createdAt: new Date(),
    };

    const result = await enrollmentsColl.insertOne(enrollmentData);

    // attach inserted id (for convenience)
    enrollmentData._id = result.insertedId;

    return NextResponse.json(
      { success: true, enrollment: enrollmentData },
      { status: 201 }
    );
  } catch (error) {
    console.error("Enrollment confirm error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
