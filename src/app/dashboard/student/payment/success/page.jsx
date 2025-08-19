"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [status, setStatus] = useState("loading"); // loading | success | error
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      setMessage("No session id in URL");
      return;
    }

    axios
      .post("/api/enrollment", { sessionId })
      .then((res) => {
        console.log("enrollment response:", res.data);
        if (res.data?.success) {
          setStatus("success");
          setMessage(res.data.message || "Enrollment successful! 🎉");
        } else {
          setStatus("error");
          setMessage(
            res.data?.error || "Something went wrong, please contact support."
          );
        }
      })
      .catch((err) => {
        console.error(
          "enrollment POST error:",
          err?.response?.data || err.message || err
        );
        setStatus("error");
        setMessage("Failed to confirm enrollment. Try again later.");
      });
  }, [sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="bg-white shadow-lg rounded-2xl p-10 text-center max-w-md w-full">
        {status === "loading" && (
          <>
            <h2 className="mt-4 text-lg font-semibold text-gray-600">
              Processing your payment...
            </h2>
          </>
        )}

        {status === "success" && (
          <>
            <h2 className="mt-4 text-2xl font-bold text-gray-800">
              Payment Successful
            </h2>
            <p className="mt-2 text-gray-600">{message}</p>
            <a
              href="/my-courses"
              className="inline-block mt-6 px-6 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
            >
              Go to My Courses
            </a>
          </>
        )}

        {status === "error" && (
          <>
            <h2 className="mt-4 text-2xl font-bold text-gray-800">
              Payment Failed
            </h2>
            <p className="mt-2 text-gray-600">{message}</p>
            <a
              href="/"
              className="inline-block mt-6 px-6 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition"
            >
              Back to Home
            </a>
          </>
        )}
      </div>
    </div>
  );
}
