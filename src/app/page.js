'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);

  const fetchTodos = async () => {
    const res = await fetch('/api/todo');
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.target);

    const res = await fetch('/api/todo', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || 'Something went wrong');
    } else {
      e.target.reset();
      fetchTodos();
    }
  };

  const handleDelete = async (id) => {
    const res = await fetch(`/api/todo/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } else {
      alert('Delete failed');
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6 mb-6 space-y-4"
        >
          <h2 className="text-2xl font-bold mb-2">Add New Task</h2>
          <input
            name="task"
            type="text"
            placeholder="Task"
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring focus:border-blue-400"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring focus:border-blue-400"
            required
          />
          {error && (
            <p className="text-red-500 bg-red-100 p-2 rounded">
              {JSON.stringify(error)}
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
          >
            Add Task
          </button>
        </form>

        <ul className="space-y-4">
          {todos.map((todo) => (
            <li
              key={todo._id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold text-lg">{todo.task}</h3>
                <p className="text-gray-600">{todo.description}</p>
              </div>
              <button
                onClick={() => handleDelete(todo._id)}
                className="text-red-600 hover:text-red-800 font-semibold"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
