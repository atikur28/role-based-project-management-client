/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useNavigate } from "react-router";
import api from "../api/axios";
import Footer from "../components/shared/Footer";
import Navbar from "../components/shared/Navbar";
import { useAuth } from "../context/useAuth";

const LoginPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data.user, res.data.token);

      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };
  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <form
          className="bg-white p-8 rounded shadow w-96"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl font-bold mb-6">Login</h1>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 cursor-pointer">
            Login
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
