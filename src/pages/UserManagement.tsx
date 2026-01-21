/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import api from "../api/axios";
import Loader from "../components/Loader";
import Toast from "../components/Toast";
import Footer from "../components/shared/Footer";
import Navbar from "../components/shared/Navbar";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

const fetchUsers = async () => {
  const res = await api.get("/users");
  return res.data.users;
};

const UserManagement = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const { data: users, isLoading: fetchingUsers } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const updateRole = useMutation<void, any, { id: string; role: string }>({
    mutationFn: async ({ id, role }) => {
      await api.patch(`/users/${id}/role`, { role });
    },
    onMutate: () => setLoading(true),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setLoading(false);
      setToast({ message: "User role updated!", type: "success" });
    },
    onError: (err: any) => {
      setLoading(false);
      setToast({
        message: err.response?.data?.message || "Error updating role",
        type: "error",
      });
    },
  });

  const updateStatus = useMutation<void, any, { id: string; status: string }>({
    mutationFn: async ({ id, status }) => {
      await api.patch(`/users/${id}/status`, { status });
    },
    onMutate: () => setLoading(true),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setLoading(false);
      setToast({ message: "User status updated!", type: "success" });
    },
    onError: (err: any) => {
      setLoading(false);
      setToast({
        message: err.response?.data?.message || "Error updating status",
        type: "error",
      });
    },
  });

  if (fetchingUsers) return <Loader />;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 p-4 bg-gray-50">
        {loading && <Loader />}
        {toast && <Toast message={toast.message} type={toast.type} />}

        <h1 className="text-3xl font-bold mb-6 text-gray-900">
          User Management
        </h1>

        {/* Table for md+ screens */}
        <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Role
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users?.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-gray-800">{user.name}</td>
                  <td className="px-4 py-3 text-gray-800">{user.email}</td>
                  <td className="px-4 py-3">
                    <select
                      value={user.role}
                      onChange={(e) =>
                        updateRole.mutate({
                          id: user._id,
                          role: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="ADMIN">ADMIN</option>
                      <option value="MANAGER">MANAGER</option>
                      <option value="STAFF">STAFF</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={user.status}
                      onChange={(e) =>
                        updateStatus.mutate({
                          id: user._id,
                          status: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="INACTIVE">INACTIVE</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Card view for mobile */}
        <div className="md:hidden space-y-4">
          {users?.map((user) => (
            <div
              key={user._id}
              className="bg-white shadow rounded-lg p-4 border border-gray-200"
            >
              <p className="text-gray-800 font-semibold">{user.name}</p>
              <p className="text-gray-600 text-sm mb-2">{user.email}</p>

              <div className="flex flex-col space-y-2">
                <div>
                  <label className="text-gray-700 text-sm font-medium">
                    Role
                  </label>
                  <select
                    value={user.role}
                    onChange={(e) =>
                      updateRole.mutate({ id: user._id, role: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1"
                  >
                    <option value="ADMIN">ADMIN</option>
                    <option value="MANAGER">MANAGER</option>
                    <option value="STAFF">STAFF</option>
                  </select>
                </div>

                <div>
                  <label className="text-gray-700 text-sm font-medium">
                    Status
                  </label>
                  <select
                    value={user.status}
                    onChange={(e) =>
                      updateStatus.mutate({
                        id: user._id,
                        status: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1"
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UserManagement;
