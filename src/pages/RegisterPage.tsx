/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import api from "../api/axios";
import Footer from "../components/shared/Footer";
import Navbar from "../components/shared/Navbar";
import { useAuth } from "../context/useAuth";

const RegisterPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams<{ token?: string }>();

  const query = new URLSearchParams(location.search);
  const token = params.token || query.get("token") || "";

  const { login } = useAuth();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setError("Invalid or missing token");
      return;
    }

    try {
      const res = await api.post("/auth/register-via-invite", {
        token,
        name,
        password,
      });

      login(res.data.user, res.data.token);
      setSuccess("Registered successfully!");
      setTimeout(() => navigate("/"), 1000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4">
        <form
          className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-md flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900 text-center">
            Complete Registration
          </h1>

          {/* Error / Success messages */}
          {error && (
            <div className="text-red-600 font-medium text-center">{error}</div>
          )}
          {success && (
            <div className="text-green-600 font-medium text-center">
              {success}
            </div>
          )}

          {/* Full Name */}
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-green-500 text-white p-3 rounded-lg font-semibold hover:bg-green-600 transition"
          >
            Register
          </button>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default RegisterPage;
