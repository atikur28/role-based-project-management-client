import { createBrowserRouter, Navigate } from "react-router";
import RootLayout from "../layouts/RootLayout";
import AdminInvite from "../pages/AdminInvite";
import Dashboard from "../pages/Dashboard";
import EditProject from "../pages/EditProject";
import Home from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ProjectManagement from "../pages/ProjectManagement";
import RegisterPage from "../pages/RegisterPage";
import UserManagement from "../pages/UserManagement";
import { AdminRoute, ProtectedRoute } from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "login",
        Component: LoginPage,
      },
      {
        path: "register/:token",
        Component: RegisterPage,
      },
      {
        path: "invite",
        Component: () => (
          <AdminRoute>
            <AdminInvite />
          </AdminRoute>
        ),
      },
      {
        path: "dashboard",
        Component: () => (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "projects",
        Component: () => (
          <ProtectedRoute>
            <ProjectManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: "projects/edit/:id",
        Component: () => (
          <ProtectedRoute>
            <EditProject />
          </ProtectedRoute>
        ),
      },
      {
        path: "users",
        Component: () => (
          <AdminRoute>
            <UserManagement />
          </AdminRoute>
        ),
      },
      {
        path: "*",
        Component: () => <Navigate to="/login" />,
      },
    ],
  },
]);
