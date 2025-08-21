"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function CourseQuizPage() {
  const { id: courseId } = useParams();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/quiz?courseId=${courseId}`)
      .then((res) => res.json())
      .then((data) => setQuizzes(data))
      .finally(() => setLoading(false));
  }, [courseId]);

  if (loading) return <p>Loading...</p>;
  if (quizzes.length === 0) return <p>কোনো quiz পাওয়া যায়নি।</p>;

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">কোর্সের Quiz</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quizzes.map((q) => (
          <div key={q._id} className="card bg-base-100 shadow-lg p-4">
            <h2 className="text-xl font-semibold">{q.title}</h2>
            <p className="mt-2">প্রশ্ন সংখ্যা: {q.questions.length}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
