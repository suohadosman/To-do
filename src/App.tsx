// src/App.tsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import TasksPage from "./Pages/TasksPages";
import TasksTablePage from "./Pages/TasksTablePage";
import NotFoundPage from "./Pages/NotFoundPage";
import ProtectedRoute from "./Components/ProtecteRoute";
import Profile from "./Pages/profile";
import Navbar from "./Components/Navbar";
import { Task } from "./Type/type";

function AppWrapper() {
  // هذا الملف يحوي المنطق لاظهار او اخفاء الـ Navbar حسب الصفحة
  const location = useLocation();

  const hideNavbarPaths = ["/", "/register"]; // المسارات التي لا تريد اظهار الـ Navbar فيها

  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(savedTasks);
  }, []);

  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
    
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <TasksPage tasks={tasks} setTasks={setTasks} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks-table"
          element={
            <ProtectedRoute>
              <TasksTablePage tasks={tasks} setTasks={setTasks} />
            </ProtectedRoute>
          }
        />
        <Route path="/profile" element={<Profile tasks={tasks} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
