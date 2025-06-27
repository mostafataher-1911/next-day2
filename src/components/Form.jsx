"use client";
import { useActionState } from "react";

const Form = ({ createTodo }) => {
  const [state, formAction, isPending] = useActionState(createTodo, {
    success: false,
    message: "",
  });

  return (
    <form
      action={formAction}
      className="w-full max-w-xl mx-auto p-6 bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl rounded-xl mt-6 mb-12 text-white"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-cyan-300">Add a New Task</h2>

      <div className="flex flex-col gap-2 mb-4">
        <label htmlFor="task_name" className="text-sm font-medium text-cyan-100">
          Task
        </label>
        <input
          type="text"
          required
          name="task_name"
          placeholder="Enter your task"
          className="w-full rounded-md bg-gray-700 border border-gray-600 p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
        />
      </div>

      <div className="flex flex-col gap-2 mb-6">
        <label htmlFor="task_desc" className="text-sm font-medium text-cyan-100">
          Description
        </label>
        <input
          type="text"
          required
          name="task_desc"
          placeholder="Enter task description"
          className="w-full rounded-md bg-gray-700 border border-gray-600 p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
        />
      </div>

      <button
        disabled={isPending}
        className={`w-full py-3 rounded-md font-semibold transition-all duration-300 ${
          isPending
            ? "bg-cyan-600 cursor-not-allowed opacity-50"
            : "bg-cyan-400 hover:bg-cyan-500"
        }`}
      >
        {isPending ? "Submitting..." : "Submit"}
      </button>

      {state.message && (
        <p
          className={`text-center mt-4 text-sm ${
            state.success ? "text-green-400" : "text-red-400"
          }`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
};

export default Form;
