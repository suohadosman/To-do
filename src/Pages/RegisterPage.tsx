// src/Pages/RegisterPage.tsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Mail, Lock, User } from "lucide-react";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !name) {
      toast.error("Please fill in all fields");
      return;
    }

    // جلب المستخدمين المسجلين من التخزين المحلي
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // التحقق من وجود البريد مسبقًا
    const userExists = users.find((u: any) => u.email === email);
    if (userExists) {
      toast.error("This email is already registered");
      return;
    }

    // إنشاء مستخدم جديد
    const newUser = { name, email, password };

    // إضافة المستخدم الجديد للقائمة
    users.push(newUser);

    // تخزين المستخدمين مجددًا
    localStorage.setItem("users", JSON.stringify(users));

    toast.success("Registration successful! Please login.");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-400 to-purple-600 p-6">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Create Account</h2>

        <div className="relative">
          <User className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="relative">
          <Mail className="absolute left-3 top-3 text-gray-400" />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-3 text-gray-400" />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          Register
        </button>

        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/" className="text-indigo-600 underline hover:text-indigo-800">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
