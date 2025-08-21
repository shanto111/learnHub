"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Swal from "sweetalert2";

export default function CreateQuiz() {
  const { id: courseId } = useParams();
  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      questions: [{ text: "", options: ["", ""], correctIndex: 0 }],
    },
  });

  const { fields, append } = useFieldArray({ control, name: "questions" });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await axios.post("/api/teacher/add-quiz", { ...data, courseId });
      Swal.fire("✅ Success", "Quiz added successfully!", "success");
      reset();
    } catch {
      Swal.fire("❌ Error", "Something went wrong!", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 bg-base-200 rounded-lg">
      <h2 className="text-xl font-bold mb-3 text-center">
        course Id : {courseId}
      </h2>
      <h2 className="text-xl font-bold mb-3 text-center">Create Quiz</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input
          {...register("title", { required: true })}
          placeholder="Quiz Title"
          className="input input-bordered w-full"
        />

        {fields.map((q, idx) => (
          <div key={q.id} className="p-3 bg-base-100 rounded space-y-2">
            <input
              {...register(`questions.${idx}.text`, { required: true })}
              placeholder={`Question ${idx + 1}`}
              className="input input-bordered w-full"
            />

            {q.options.map((_, optIdx) => (
              <div key={optIdx} className="flex gap-2">
                <input
                  type="radio"
                  {...register(`questions.${idx}.correctIndex`)}
                  value={optIdx}
                  className="radio"
                />
                <input
                  {...register(`questions.${idx}.options.${optIdx}`)}
                  placeholder={`Option ${optIdx + 1}`}
                  className="input input-bordered flex-1"
                />
              </div>
            ))}
          </div>
        ))}

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() =>
              append({ text: "", options: ["", ""], correctIndex: 0 })
            }
            className="btn"
          >
            + Add Question
          </button>
          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? "Saving..." : "Save Quiz"}
          </button>
        </div>
      </form>
    </div>
  );
}
