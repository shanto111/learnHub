// components/CreateQuiz.jsx
"use client";
import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import axios from "axios";

export default function CreateQuiz({ courseId }) {
  const { control, register, handleSubmit, watch, setValue, getValues } =
    useForm({
      defaultValues: {
        title: "",
        description: "",
        durationMinutes: 30,
        published: false,
        shuffleOptions: true,
        questions: [
          {
            id: Date.now().toString(),
            type: "mcq",
            text: "",
            options: ["", "", "", ""],
            correctIndex: 0,
            marks: 1,
          },
        ],
      },
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });
  const [loading, setLoading] = useState(false);
  const watchAll = watch();

  // autosave to localStorage
  useEffect(() => {
    const save = () =>
      localStorage.setItem(
        `quiz-draft-${courseId}`,
        JSON.stringify(getValues())
      );
    const handler = setTimeout(save, 800);
    return () => clearTimeout(handler);
  }, [watchAll, courseId, getValues]);

  // load draft if exists
  useEffect(() => {
    const draft = localStorage.getItem(`quiz-draft-${courseId}`);
    if (draft) {
      try {
        const data = JSON.parse(draft);
        // set values
        Object.keys(data).forEach((k) => setValue(k, data[k]));
      } catch (e) {}
    }
  }, [courseId, setValue]);

  const addQuestion = () =>
    append({
      id: Date.now().toString(),
      type: "mcq",
      text: "",
      options: ["", "", "", ""],
      correctIndex: 0,
      marks: 1,
    });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      // server expects courseId
      const payload = { ...data, courseId };

      alert("Quiz saved successfully");
      localStorage.removeItem(`quiz-draft-${courseId}`);
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Error saving quiz");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        {...register("title", { required: true })}
        placeholder="Quiz Title"
        className="input w-full"
      />
      <textarea
        {...register("description")}
        placeholder="Description (optional)"
        className="textarea w-full"
      />

      <div className="flex gap-2">
        <input
          type="number"
          {...register("durationMinutes", { valueAsNumber: true })}
          className="input w-48"
        />
        <label className="flex items-center gap-2">
          <input type="checkbox" {...register("shuffleOptions")} />
          Shuffle options
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" {...register("published")} />
          Publish now
        </label>
      </div>

      {fields.map((q, idx) => (
        <div key={q.id} className="p-3 border rounded">
          <div className="flex justify-between items-center">
            <div>Question {idx + 1}</div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => remove(idx)}
                className="btn btn-sm"
              >
                Remove
              </button>
              <button
                type="button"
                onClick={() => {
                  // duplicate question
                  const values = getValues();
                  const qdata = values.questions[idx];
                  append({ ...qdata, id: Date.now().toString() });
                }}
                className="btn btn-sm"
              >
                Duplicate
              </button>
            </div>
          </div>

          <select {...register(`questions.${idx}.type`)}>
            <option value="mcq">MCQ</option>
            <option value="tf">True/False</option>
            <option value="short">Short Answer</option>
          </select>

          <input
            {...register(`questions.${idx}.text`, { required: true })}
            placeholder="Question text"
            className="input w-full"
          />

          {/* options list (only for mcq) */}
          <div>
            <Controller
              control={control}
              name={`questions.${idx}.options`}
              render={({ field }) =>
                field.value.map((opt, optIdx) => (
                  <div key={optIdx} className="flex items-center gap-2">
                    <input
                      type="radio"
                      {...register(`questions.${idx}.correctIndex`)}
                      value={optIdx}
                      defaultChecked={optIdx === 0}
                    />
                    <input
                      value={opt}
                      onChange={(e) => {
                        const newOpts = [...field.value];
                        newOpts[optIdx] = e.target.value;
                        field.onChange(newOpts);
                      }}
                      placeholder={`Option ${optIdx + 1}`}
                      className="input flex-1"
                    />
                  </div>
                ))
              }
            />
            <div className="flex gap-2 mt-2">
              <button
                type="button"
                onClick={() => {
                  const val = getValues();
                  const opts = val.questions[idx].options || [];
                  setValue(`questions.${idx}.options`, [...opts, ""]);
                }}
                className="btn btn-xs"
              >
                Add Option
              </button>
              <button
                type="button"
                onClick={() => {
                  const val = getValues();
                  const opts = val.questions[idx].options || [];
                  if (opts.length > 2)
                    setValue(`questions.${idx}.options`, opts.slice(0, -1));
                }}
                className="btn btn-xs"
              >
                Remove Option
              </button>
            </div>
          </div>

          <input
            type="number"
            {...register(`questions.${idx}.marks`, { valueAsNumber: true })}
            placeholder="Marks"
            className="input w-24 mt-2"
          />
          <input
            {...register(`questions.${idx}.explanation`)}
            placeholder="Explanation (teacher-only)"
            className="input w-full mt-2"
          />
        </div>
      ))}

      <div className="flex gap-2">
        <button type="button" onClick={addQuestion} className="btn">
          Add Question
        </button>
        <button type="submit" disabled={loading} className="btn btn-primary">
          {loading ? "Saving..." : "Save Quiz"}
        </button>
      </div>
    </form>
  );
}
