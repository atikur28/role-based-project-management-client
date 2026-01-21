/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import api from "../api/axios";
import Loader from "../components/Loader";
import Footer from "../components/shared/Footer";
import Navbar from "../components/shared/Navbar";
import Toast from "../components/Toast";
import { useAuth } from "../context/useAuth";

interface Project {
  _id: string;
  name: string;
  description: string;
  status: string;
  createdBy: { name: string; email: string; role: string };
}

const fetchProjects = async () => {
  const res = await api.get("/projects");
  return res.data.projects;
};

const ProjectManagement = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { data: projects, isLoading: fetchingProjects } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  const createProject = useMutation<void, any, void>({
    mutationFn: async () => {
      await api.post("/projects", { name, description });
    },
    onMutate: () => setLoading(true),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      setLoading(false);
      setToast({ message: "Project created successfully!", type: "success" });
      setName("");
      setDescription("");
    },
    onError: (err: any) => {
      setLoading(false);
      setToast({
        message: err.response?.data?.message || "Error creating project",
        type: "error",
      });
    },
  });

  const deleteProject = useMutation<void, any, string>({
    mutationFn: async (id) => {
      await api.delete(`/projects/${id}`);
    },
    onMutate: () => setLoading(true),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      setLoading(false);
      setToast({ message: "Project deleted successfully!", type: "success" });
    },
    onError: (err: any) => {
      setLoading(false);
      setToast({
        message: err.response?.data?.message || "Error deleting project",
        type: "error",
      });
    },
  });

  if (fetchingProjects) return <Loader />;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 p-4 bg-gray-50">
        {loading && <Loader />}
        {toast && <Toast message={toast.message} type={toast.type} />}

        <h1 className="text-3xl font-bold mb-6 text-gray-900">
          Project Management
        </h1>

        {/* Create Project Form */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow border border-gray-200 max-w-2xl">
          <h2 className="font-semibold mb-2 text-gray-800">
            Create New Project
          </h2>
          <input
            className="border border-gray-300 p-2 rounded w-full mb-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Project Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            className="border border-gray-300 p-2 rounded w-full mb-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition cursor-pointer"
            onClick={() => createProject.mutate()}
          >
            Create Project
          </button>
        </div>

        {/* Table for md+ screens */}
        <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Description
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Created By
                </th>
                {user?.role === "ADMIN" && (
                  <th className="px-4 py-3">Actions</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {projects?.map((project) => (
                <tr
                  key={project._id}
                  className={`hover:bg-gray-50 transition ${
                    project.status === "DELETED"
                      ? "opacity-50 line-through"
                      : ""
                  }`}
                >
                  <td className="px-4 py-3">{project.name}</td>
                  <td className="px-4 py-3">{project.description}</td>
                  <td className="px-4 py-3">{project.status}</td>
                  <td className="px-4 py-3">{project.createdBy.name}</td>
                  {user?.role === "ADMIN" && (
                    <td className="px-4 py-3 flex gap-2">
                      <button
                        onClick={() =>
                          navigate(`/projects/edit/${project._id}`)
                        }
                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProject.mutate(project._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Card view for mobile */}
        <div className="md:hidden space-y-4">
          {projects?.map((project) => (
            <div
              key={project._id}
              className={`bg-white shadow rounded-lg p-4 border border-gray-200 ${
                project.status === "DELETED" ? "opacity-50 line-through" : ""
              }`}
            >
              <p className="text-gray-800 font-semibold text-lg">
                {project.name}
              </p>
              <p className="text-gray-600 text-sm mb-2">
                {project.description}
              </p>
              <p className="text-gray-700 font-medium">
                Status: {project.status}
              </p>
              <p className="text-gray-700 font-medium mb-2">
                Created by: {project.createdBy.name}
              </p>

              {user?.role === "ADMIN" && (
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => navigate(`/projects/edit/${project._id}`)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition flex-1 cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProject.mutate(project._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition flex-1 cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectManagement;
