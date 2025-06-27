"use client";

import { handleTaskDelete, handleTaskUpdate } from "@/handlers/todoItem";
import { useRouter } from "next/navigation";
import { useState } from "react";

const TaskItem = ({ task }) => {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [taskName, setTaskName] = useState(task.task_name);
  const [taskDesc, setTaskDesc] = useState(task.task_desc);

  const handleNameChange = (e) => setTaskName(e.target.value);
  const handleDescChange = (e) => setTaskDesc(e.target.value);
  const toggleUpdate = () => setIsUpdating(!isUpdating);

  const handleSave = async (id) => {
    setIsLoading(true);
    try {
      await handleTaskUpdate(id, taskName, taskDesc, router);
    } catch (error) {
      console.error("Failed to update", error);
    } finally {
      router.refresh();
      setIsLoading(false);
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      await handleTaskDelete(id, router);
    } catch (error) {
      console.error("Failed to delete", error);
    } finally {
      router.refresh();
      setIsLoading(false);
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    setTaskName(task.task_name);
    setTaskDesc(task.task_desc);
    setIsUpdating(false);
  };

  return isLoading ? (
    <p className="text-center text-gray-400 italic animate-pulse">Processing...</p>
  ) : (
    <li className="list-none bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-5 shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 text-white transition-all duration-300">
      {/* Display mode */}
      {!isUpdating && (
        <div>
          <h2 className="text-lg font-semibold text-cyan-300">{task.task_name}</h2>
          <p className="text-sm text-gray-300">{task.task_desc}</p>
        </div>
      )}

      {/* Edit mode */}
      {isUpdating && (
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto flex-1">
          <input
            onChange={handleNameChange}
            value={taskName}
            type="text"
            className="flex-1 p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <input
            onChange={handleDescChange}
            value={taskDesc}
            type="text"
            className="flex-1 p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3 mt-2 sm:mt-0 sm:ml-4">
        {!isUpdating && (
          <>
            <button onClick={() => handleDelete(task._id)} className="hover:scale-105 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#f87171" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21..." />
              </svg>
            </button>
            <button onClick={toggleUpdate} className="hover:scale-105 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#4ade80" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="..." />
              </svg>
            </button>
          </>
        )}
        {isUpdating && (
          <>
            <button onClick={handleCancel} className="text-red-400 hover:underline text-sm font-medium">
              Cancel
            </button>
            <button onClick={() => handleSave(task._id)} className="text-cyan-400 hover:underline text-sm font-medium">
              Save
            </button>
          </>
        )}
      </div>
    </li>
  );
};

export default TaskItem;
