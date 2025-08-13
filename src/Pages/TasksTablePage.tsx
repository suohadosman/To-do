// src/Pages/TasksTablePage.tsx
import React, { useState } from "react";
import { Task } from "../Type/type";
import EditTaskModal from "../Components/EditTaskModal";
import { Pencil, Trash2 } from "lucide-react";

interface Props {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TasksTablePage: React.FC<Props> = ({ tasks, setTasks }) => {
  const rawUser = localStorage.getItem("loggedInUser") || "";

  // نحاول قراءة البريد من JSON، وإن فشل نستخدم القيمة الخام (لدعم كلا الطريقتين)
  let email = "";
  try {
    const parsed = rawUser ? JSON.parse(rawUser) : null;
    email = parsed?.email || "";
  } catch {
    email = "";
  }
  const ownerKey = email || rawUser;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  // تصفية مهام المستخدم الحالي مرة واحدة فقط
  const userTasks = tasks.filter((task) => task.owner === ownerKey);

  const openEditModal = (task: Task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const handleSaveEdit = (newText: string) => {
    if (!taskToEdit) return;
    const updatedTasks = tasks.map((task) =>
      task.id === taskToEdit.id ? { ...task, text: newText } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setIsModalOpen(false);
    setTaskToEdit(null);
  };

  const handleDelete = (id: number) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
        📝 Task Dashboard
      </h2>

      <table className="w-full border border-gray-200 rounded overflow-hidden">
        <thead className="bg-blue-100 text-sm text-gray-700">
          <tr>
            <th className="px-4 py-2 border">#</th>
            <th className="px-4 py-2 border">Task</th>
            <th className="px-4 py-2 border">Created At</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {userTasks.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center py-6 text-gray-500">
                No tasks found.
              </td>
            </tr>
          )}

          {userTasks.map((task, index) => (
            <tr
              key={task.id}
              className={`text-sm border-t ${
                task.completed ? "bg-green-50" : "bg-white"
              }`}
            >
              <td className="px-4 py-2 border">{index + 1}</td>
              <td className="px-4 py-2 border">
                <span
                  className={task.completed ? "line-through text-gray-500" : ""}
                >
                  {task.text}
                </span>
              </td>
              <td className="px-4 py-2 border text-gray-600">
                {new Date(task.createdAt).toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </td>
              <td className="px-4 py-2 border">
                {task.completed ? (
                  <span className="text-green-600 font-semibold">Completed</span>
                ) : (
                  <span className="text-red-600 font-semibold">Pending</span>
                )}
              </td>
              <td className="px-4 py-2 border flex space-x-2">
                <button
                  onClick={() => openEditModal(task)}
                  className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                >
                  <Pencil className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <EditTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        taskText={taskToEdit?.text || ""}
        onSave={handleSaveEdit}
      />
    </div>
  );
};

export default TasksTablePage;
