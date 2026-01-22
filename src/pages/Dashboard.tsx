import { Link } from "react-router";
import Footer from "../components/shared/Footer";
import Navbar from "../components/shared/Navbar";
import { useAuth } from "../context/useAuth";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 max-w-6xl mx-auto px-4 py-6">
        {/* Welcome Section */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome, {user?.name || "User"}!
          </h1>
          <p className="text-gray-700">
            Role: <span className="font-semibold">{user?.role}</span>
          </p>
          <p className="text-gray-700">
            Role: <span className="font-semibold">{user?.email}</span>
          </p>
          <p className="text-gray-600 mt-2">
            Access your dashboards, manage projects, and control users based on
            your role.
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* User Management - ADMIN Only */}
          {user?.role === "ADMIN" && (
            <Link
              to="/users"
              className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition border border-gray-200"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                User Management
              </h2>
              <p className="text-gray-600">
                View all users, manage roles, activate or deactivate accounts,
                and monitor invitations.
              </p>
            </Link>
          )}

          {/* Project Management - All Roles */}
          <Link
            to="/projects"
            className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition border border-gray-200"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Project Management
            </h2>
            <p className="text-gray-600">
              Create new projects, view existing projects, and manage project
              details (edit/delete only if ADMIN).
            </p>
          </Link>

          {/* Invite Users - ADMIN Only */}
          {user?.role === "ADMIN" && (
            <Link
              to="/invite"
              className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition border border-gray-200"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Invite Users
              </h2>
              <p className="text-gray-600">
                Generate invite links for new users and control onboarding with
                expiration and roles.
              </p>
            </Link>
          )}
        </div>

        {/* Info Section */}
        <div className="mt-10 p-6 bg-gray-50 rounded-lg border border-gray-200 text-gray-700">
          <h3 className="text-lg font-semibold mb-2">Dashboard Tips:</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>
              Admins can manage users and their roles, while Managers & Staff
              have limited permissions.
            </li>
            <li>
              Projects created by any user are visible to all; only Admins can
              edit or soft-delete.
            </li>
            <li>
              Invites are required for new users—no self-registration is
              allowed.
            </li>
            <li>
              Always check user status; deactivated users cannot access the
              system.
            </li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;
