import React from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  CheckCircle,
  Clock,
  LogOut,
  ListTodo,
} from "lucide-react";

interface Task {
  id: number;
  text: string;
  completed: boolean;
  owner: string;
}

interface Props {
  tasks: Task[];
}

const Profile: React.FC<Props> = ({ tasks }) => {
  const navigate = useNavigate();

  // قراءة بيانات المستخدم من localStorage (JSON)
  const rawUser = localStorage.getItem("loggedInUser");
  const parsedUser = rawUser ? JSON.parse(rawUser) : { email: "", password: "", name: "" };

  const { email, password, name } = parsedUser;

  // فلترة المهام حسب البريد الإلكتروني فقط (owner هو البريد)
  const userTasks = tasks.filter((task) => task.owner === email);

  // حساب المهام المكتملة وغير المكتملة
  const completed = userTasks.filter((t) => t.completed).length;
  const pending = userTasks.length - completed;

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-3xl shadow-xl space-y-8 border border-gray-200">
      <h2 className="text-3xl font-bold text-center text-indigo-700 flex items-center justify-center gap-2">
        <User className="text-indigo-700" />
        Profile
      </h2>

      {/* بيانات المستخدم */}
      <div className="space-y-6 text-gray-800">
        <div className="flex items-center gap-4">
          <User className="text-indigo-600 w-5 h-5" />
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-semibold text-lg">{name || "N/A"}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Mail className="text-indigo-600 w-5 h-5" />
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-semibold text-lg">{email || "N/A"}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Lock className="text-indigo-600 w-5 h-5" />
          <div>
            <p className="text-sm text-gray-500">Password</p>
            <p className="font-semibold text-lg">{password ? "••••••••" : "N/A"}</p>
          </div>
        </div>
      </div>

      {/* إحصائيات المهام */}
      <div className="border-t border-gray-200 pt-6 space-y-4">
        <div className="flex items-center gap-3 text-green-600">
          <CheckCircle className="w-5 h-5" />
          <span className="text-base">
            Completed Tasks: <strong>{completed}</strong>
          </span>
        </div>

        <div className="flex items-center gap-3 text-yellow-500">
          <Clock className="w-5 h-5" />
          <span className="text-base">
            Pending Tasks: <strong>{pending}</strong>
          </span>
        </div>
      </div>

      {/* أزرار التنقل */}
      <div className="pt-6 flex justify-between">
        <button
          onClick={() => navigate("/tasks")}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl shadow transition"
        >
          <ListTodo className="w-4 h-4" />
          Tasks
        </button>

        <button
          onClick={() => {
            localStorage.removeItem("loggedInUser");
            navigate("/");
          }}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl shadow transition"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
