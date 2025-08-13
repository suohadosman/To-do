// src/components/Navbar.tsx
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LogOut, User, ListTodo, Table2, BadgeCheck } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-blue-700 px-6 py-4 shadow-md flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <BadgeCheck className="text-white w-6 h-6 animate-pulse" />
        <span className="text-white font-bold text-2xl tracking-wide">To-Do App</span>
      </div>

      {/* Navigation */}
      <div className="flex items-center space-x-6 text-white text-md">
        <Link
          to="/tasks"
          className={`flex items-center gap-1 hover:text-blue-300 transition ${
            isActive("/tasks") ? "border-b-2 border-white pb-1" : ""
          }`}
        >
          <ListTodo className="w-5 h-5" />
          Tasks
        </Link>

        <Link
          to="/tasks-table"
          className={`flex items-center gap-1 hover:text-blue-300 transition ${
            isActive("/tasks-table") ? "border-b-2 border-white pb-1" : ""
          }`}
        >
          <Table2 className="w-5 h-5" />
          Task Table
        </Link>

        <Link
          to="/profile"
          className={`flex items-center gap-1 hover:text-blue-300 transition ${
            isActive("/profile") ? "border-b-2 border-white pb-1" : ""
          }`}
        >
          <User className="w-5 h-5" />
          Profile
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-white hover:text-red-300 transition"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
