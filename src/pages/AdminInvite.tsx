/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import api from "../api/axios";
import Footer from "../components/shared/Footer";
import Navbar from "../components/shared/Navbar";

type Invite = {
  _id: string;
  email: string;
  role: "ADMIN" | "MANAGER" | "STAFF";
  token: string;
  acceptedAt?: string;
  expiresAt?: string;
};

const AdminInvite: React.FC = () => {
  const queryClient = useQueryClient();

  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Invite["role"]>("STAFF");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { data: invites } = useQuery<Invite[], Error>({
    queryKey: ["invites"],
    queryFn: async () => {
      const res = await api.get("/auth/invite");
      return res.data.invites as Invite[];
    },
  });

  const inviteMutation = useMutation<
    Invite,
    Error,
    { email: string; role: Invite["role"] }
  >({
    mutationFn: async ({ email, role }) => {
      const res = await api.post("/auth/invite", { email, role });
      return res.data as Invite;
    },
    onSuccess: (data) => {
      setSuccess(`Invite created! Token: ${data.token}`);
      setError("");
      setEmail("");
      queryClient.invalidateQueries({ queryKey: ["invites"] });
    },
    onError: (err: any) => {
      setError(err.response?.data?.message || "Failed to create invite");
      setSuccess("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    inviteMutation.mutate({ email, role });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex-1 p-4 flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Invite New User
        </h1>

        {/* Invite Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-md flex flex-col gap-4"
        >
          {error && (
            <div className="text-red-600 font-medium text-center">{error}</div>
          )}
          {success && (
            <div className="text-green-600 font-medium break-all text-center">
              Invite created! Link:{" "}
              <a
                href={`https://project-management-client-orpin.vercel.app/register/${inviteMutation.data?.token}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-600 hover:text-blue-700"
              >
                {`https://project-management-client-orpin.vercel.app/register/${inviteMutation.data?.token}`}
              </a>
            </div>
          )}

          <input
            type="email"
            placeholder="User Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={role}
            onChange={(e) => setRole(e.target.value as Invite["role"])}
          >
            <option value="ADMIN">ADMIN</option>
            <option value="MANAGER">MANAGER</option>
            <option value="STAFF">STAFF</option>
          </select>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition cursor-pointer"
          >
            Send Invite
          </button>
        </form>

        {/* Pending Invites */}
        <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-800 text-center">
          Pending Invites
        </h2>

        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg w-full max-w-md space-y-3">
          {invites && invites.length > 0 ? (
            invites.map((inv) => (
              <div
                key={inv._id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 pb-2 last:border-b-0 gap-1 sm:gap-0"
              >
                <div className="text-gray-700 font-medium">
                  {inv.email} ({inv.role})
                  <span className="text-yellow-600"> - Pending</span>
                </div>

                <div className="text-gray-400 text-sm font-mono break-all">
                  {inv.token}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No pending invites</p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminInvite;
