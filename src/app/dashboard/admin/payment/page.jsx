"use client";
import { useEffect, useState } from "react";

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    async function loadPayments() {
      try {
        const res = await fetch("/api/admin/payments");
        const json = await res.json();

        if (json.error) {
          setErr(json.error);
        } else {
          setPayments(json.payments || []);
        }
      } catch (e) {
        setErr(e.message || "Failed to load payments");
      } finally {
        setLoading(false);
      }
    }
    loadPayments();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner w-10 h-10 text-primary"></span>
      </div>
    );

  if (err)
    return (
      <div className="p-6 text-center text-red-600 font-medium bg-red-50 rounded-lg">
        ❌ {err}
      </div>
    );

  return (
    <div className="p-6 space-y-6">
      {/* Reports Button */}
      <div className="bg-white shadow rounded-lg p-6 flex items-center justify-between">
        <a
          href="/dashboard/admin/reports"
          className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition"
        >
          📊 View Reports
        </a>
      </div>

      {/* Payments Table */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="mb-4 text-xl font-semibold text-gray-800">
          Recent Payments
        </h3>

        {payments.length === 0 ? (
          <div className="text-gray-600 bg-gray-50 border rounded-lg p-6 text-center">
            No payments found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full border rounded-lg">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Student</th>
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
                    <td className="p-3 text-sm">
                      <div className="font-medium">{p.studentId}</div>
                      <div className="text-xs text-gray-500">{p.email}</div>
                    </td>
                    <td className="p-3 text-sm font-medium">{p.courseId}</td>
                    <td className="p-3 text-sm font-semibold text-gray-800">
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
    </div>
  );
}
