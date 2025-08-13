import React, { useState } from "react";
import { User } from "lucide-react";

interface Task {
  id: number;
  text: string;
  completed: boolean;
  owner: string;
  createdAt: string;
}

interface Props {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TasksPage: React.FC<Props> = ({ tasks, setTasks }) => {
  const rawUser = localStorage.getItem("loggedInUser") || "";
  let email = "";
  try {
    email = rawUser ? JSON.parse(rawUser).email : "";
  } catch {
    email = "";
  }

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");

  // تصفية المهام حسب البريد الإلكتروني للمستخدم
  const userTasks = tasks.filter((task) => task.owner === email);

  // تطبيق البحث والفلترة
  const filteredTasks = userTasks.filter((task) => {
    const matchesSearch = task.text.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "completed" && task.completed) ||
      (filter === "pending" && !task.completed);
    return matchesSearch && matchesFilter;
  });

  // إضافة مهمة جديدة
  const addTask = (text: string) => {
    const newTask: Task = {
      id: Date.now(),
      text,
      completed: false,
      owner: email,
      createdAt: new Date().toISOString(),
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  // تبديل حالة إتمام المهمة
  const toggleComplete = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  // حذف المهمة
  const deleteTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 bg-white shadow-xl rounded-2xl p-8">
      {/* ترحيب مع أيقونة */}
      <header className="flex items-center justify-center gap-3 mb-8">
        <User className="w-10 h-10 text-indigo-600" />
        <h1 className="text-4xl font-extrabold text-indigo-700 capitalize drop-shadow-md">
          Welcome back!
          <span className="ml-2 text-2xl animate-pulse">🎉</span>
        </h1>
      </header>

      <p className="text-center text-gray-600 mb-8 text-lg">
        Here are your tasks. Stay productive!
      </p>

      {/* نموذج إضافة مهمة */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const input = (e.target as any).task;
          const text = input.value.trim();
          if (text) {
            addTask(text);
            input.value = "";
          }
        }}
        className="flex gap-3 mb-6"
      >
        <input
          name="task"
          type="text"
          placeholder="Add a new task..."
          className="flex-grow px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-300 transition"
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          Add
        </button>
      </form>

      {/* البحث */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-300 transition"
        />
      </div>

      {/* الفلترة */}
      <div className="mb-6">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
          className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-300 transition"
        >
          <option value="all">All Tasks</option>
          <option value="completed">Completed Tasks</option>
          <option value="pending">Pending Tasks</option>
        </select>
      </div>

      {/* قائمة المهام */}
      <ul className="space-y-3">
        {filteredTasks.length === 0 && (
          <li className="text-center text-gray-500 text-lg py-6">
            No tasks found.
          </li>
        )}
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className={`flex justify-between items-center px-5 py-3 rounded-lg shadow-sm transition
              ${task.completed ? "bg-green-100" : "bg-gray-50 hover:bg-gray-100"}`}
          >
            <span
              className={`text-lg font-medium ${
                task.completed ? "line-through text-gray-400" : "text-gray-800"
              }`}
            >
              {task.text}
            </span>
            <div className="flex gap-3">
              <button
                onClick={() => toggleComplete(task.id)}
                className={`px-3 py-1 rounded-md font-semibold text-white transition
                  ${task.completed ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-600 hover:bg-green-700"}`}
              >
                {task.completed ? "Undo" : "Done"}
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="px-3 py-1 rounded-md font-semibold bg-red-600 hover:bg-red-700 text-white transition"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksPage;
