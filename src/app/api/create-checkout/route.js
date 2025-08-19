// app/api/create-checkout/route.js
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { dbConnection } from "@/utils/dbConnection";
import Stripe from "stripe";
import { ServerSession } from "@/utils/getServerSession";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // <--- IMPORTANT: server-only secret

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("/api/create-checkout body:", body);

    const Session = await ServerSession();
    if (!Session)
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const { courseId, studentId } = body || {};
    if (!courseId)
      return NextResponse.json({ error: "courseId required" }, { status: 400 });

    let filter;
    try {
      filter = { _id: new ObjectId(courseId) };
    } catch (e) {
      filter = { _id: courseId };
    }

    const db = await dbConnection();
    if (!db)
      return NextResponse.json(
        { error: "DB connection failed" },
        { status: 500 }
      );

    const course = await db.collection("courses").findOne(filter);
    if (!course)
      return NextResponse.json({ error: "Course not found" }, { status: 404 });

    const price = Number(course.price);
    if (!price || Number.isNaN(price) || price <= 0) {
      return NextResponse.json(
        { error: "Invalid course price" },
        { status: 400 }
      );
    }

    const currency = process.env.STRIPE_CURRENCY || "usd";
    const unit_amount = Math.round(price * 100);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: course.title || "Course",
              images: course.thumbnail ? [course.thumbnail] : [],
            },
            unit_amount,
          },
          quantity: 1,
        },
      ],
      metadata: {
        courseId: String(courseId),
        studentId: studentId ? String(studentId) : "",
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/student/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancel`,
    });

    console.log("Stripe session created:", session.id);
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("create-checkout error:", err);
    return NextResponse.json(
      { error: err?.message || "Server error" },
      { status: 500 }
    );
  }
}
