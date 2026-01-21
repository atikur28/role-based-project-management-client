/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../api/axios";
import Loader from "../components/Loader";
import Toast from "../components/Toast";
import Footer from "../components/shared/Footer";
import Navbar from "../components/shared/Navbar";

interface Project {
  _id: string;
  name: string;
  description: string;
  status: "ACTIVE" | "ARCHIVED" | "DELETED";
}

const EditProject = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const statusRef = useRef<HTMLSelectElement>(null);

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // Fetch project (no onSuccess)
  const { data: project, isLoading } = useQuery<Project>({
    queryKey: ["project", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await api.get(`/projects/${id}`);
      return res.data.project;
    },
  });

  // Update mutation
  const updateProject = useMutation({
    mutationFn: async () => {
      await api.patch(`/projects/${id}`, {
        name: nameRef.current?.value,
        description: descriptionRef.current?.value,
        status: statusRef.current?.value,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project", id] });

      setToast({ message: "Project updated successfully!", type: "success" });
      setTimeout(() => navigate("/projects"), 1000);
    },
    onError: (err: any) => {
      setToast({
        message: err.response?.data?.message || "Update failed",
        type: "error",
      });
    },
  });

  if (isLoading || !project) return <Loader />;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex-1 flex justify-center items-center p-4">
        {toast && <Toast message={toast.message} type={toast.type} />}

        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-gray-900">
            Edit Project
          </h1>

          <input
            ref={nameRef}
            defaultValue={project.name}
            className="border border-gray-300 p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Project Name"
          />

          <textarea
            ref={descriptionRef}
            defaultValue={project.description}
            className="border border-gray-300 p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Description"
          />

          <select
            ref={statusRef}
            defaultValue={project.status} // defaultValue from fetch
            className="border border-gray-300 p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="ACTIVE">ACTIVE</option>
            <option value="ARCHIVED">ARCHIVED</option>
            <option value="DELETED">DELETED</option>
          </select>

          <div className="flex gap-4 mt-2">
            <button
              onClick={() => updateProject.mutate()}
              disabled={updateProject.isPending}
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition cursor-pointer"
            >
              {updateProject.isPending ? "Updating..." : "Update"}
            </button>

            <button
              onClick={() => navigate("/projects")}
              className="flex-1 bg-gray-300 py-2 rounded-lg hover:bg-gray-400 transition cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EditProject;
