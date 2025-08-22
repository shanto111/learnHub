"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function StudentPaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    async function loadPayments() {
      try {
        const res = await axios.get("/api/student/payments");
        setPayments(res.data.payments || []);
      } catch (error) {
        setErr(error.response?.data?.message || "Failed to fetch payments.");
      } finally {
        setLoading(false);
      }
    }
    loadPayments();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner text-primary w-10 h-10"></span>
      </div>
    );

  if (err)
    return (
      <div className="p-6 text-center text-red-600 font-medium bg-red-50 rounded-lg">
        ❌ {err}
      </div>
    );

  return (
    <div className="p-6  rounded-lg shadow bg-white">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">💳 My Payments</h1>

      {payments.length === 0 ? (
        <div className="text-gray-600 bg-gray-50 border rounded-lg p-6 text-center">
          No payments found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Course</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Session ID</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr
                  key={p.sessionId || p._id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="p-3 text-sm text-gray-700">
                    {new Date(p.createdAt).toLocaleDateString()}{" "}
                    <span className="text-gray-400">
                      {new Date(p.createdAt).toLocaleTimeString()}
                    </span>
                  </td>
                  <td className="p-3 text-sm text-gray-700 font-medium">
                    {p.courseId || "—"}
                  </td>
                  <td className="p-3 text-sm text-gray-800 font-semibold">
                    {(p.amount, p.currency)}
                  </td>
                  <td className="p-3 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        p.status === "paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="p-3 text-sm text-gray-500 break-all">
                    {p.sessionId}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
