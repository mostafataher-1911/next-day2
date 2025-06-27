import { createTodo, getTodos } from "@/actions/tasks.js";
import Form from "@/components/Form";
import TaskItem from "@/components/Item";

export default async function Home() {
  const tasks = await getTodos();
  const plainTasks = tasks.map((task) => ({
    _id: task._id.toString(),
    task_name: task.task_name,
    task_desc: task.task_desc,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center py-10 px-4 text-white">
      <h1 className="text-4xl font-extrabold mb-8 text-cyan-400 drop-shadow-lg">📝 Todo App</h1>

      <div className="w-full max-w-2xl flex flex-col gap-6">
        <Form createTodo={createTodo} />

        <ul className="flex flex-col gap-4">
          {plainTasks.length > 0 ? (
            plainTasks.map((task) => (
              <TaskItem task={task} key={task._id} />
            ))
          ) : (
            <li className="text-center text-gray-400 italic mt-4">No tasks yet. Add your first one!</li>
          )}
        </ul>
      </div>
    </div>
  );
}
