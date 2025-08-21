import { dbConnection } from "@/utils/dbConnection";
import { ObjectId } from "mongodb";

const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

async function uploadToCloudinary(file) {
  const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload`;

  const form = new FormData();
  form.append("file", file);
  form.append("upload_preset", UPLOAD_PRESET);

  const res = await fetch(url, { method: "POST", body: form });
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.error?.message || "Cloudinary upload failed");
  }

  return json;
}

export async function POST(req) {
  try {
    const formData = await req.formData();

    const video = formData.get("video");
    const title = formData.get("title") || "Untitled Lecture";
    const order = parseInt(formData.get("order")) || 1; // order courseId এর সাথে থাকবে
    const isFreePreview = formData.get("isFreePreview") === "true";
    const durationSec = parseInt(formData.get("durationSec")) || 0;
    const courseId = formData.get("courseId");

    if (!video) {
      return new Response(JSON.stringify({ error: "No video file provided" }), {
        status: 400,
      });
    }

    const MAX_SIZE_BYTES = 350 * 1024 * 1024;
    if (video.size && video.size > MAX_SIZE_BYTES) {
      return new Response(
        JSON.stringify({ error: "Video too large on server" }),
        { status: 400 }
      );
    }

    const clResult = await uploadToCloudinary(video);
    const videoUrl = clResult.secure_url;

    const lectureItem = {
      _id: new ObjectId(),
      title,
      lecturerName,
      durationSec,
      isFreePreview,
      videoUrl,
      videoPublicId: clResult.public_id,
      createdAt: new Date(),
    };

    const db = await dbConnection();
    const lecturesCollection = db.collection("lectures");

    await lecturesCollection.updateOne(
      { courseId: new ObjectId(courseId), order },
      {
        $push: { lectures: lectureItem },
        $setOnInsert: {
          courseId: new ObjectId(courseId),
          order,
        },
      },
      { upsert: true }
    );

    return new Response(JSON.stringify({ success: true, lectureItem }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("/api/teacher/upload-video error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Server error" }),
      { status: 500 }
    );
  }
}
