import Footer from "../components/shared/Footer";
import Navbar from "../components/shared/Navbar";

export default function Home() {
  return (
    <div className="max-w-400 min-h-screen mx-auto flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <div className="flex flex-col items-center justify-center flex-1 bg-gray-50 px-4">
        {/* Hero Section */}
        <h1 className="text-5xl font-extrabold mb-6 text-gray-900 text-center">
          RBAC Project Management System
        </h1>
        <p className="text-gray-700 text-center max-w-2xl mb-8">
          A role-based admin and project management system with invite-only user
          onboarding. Manage users, control permissions, and track projects
          securely and efficiently.
        </p>

        {/* System Info Section */}
        <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl w-full space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Key Features</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              <strong>Invite-based User Onboarding:</strong> Users can only
              register via admin-generated invites.
            </li>
            <li>
              <strong>Role-Based Access Control (RBAC):</strong> Admins,
              Managers, and Staff with specific permissions.
            </li>
            <li>
              <strong>Project Management:</strong> All users can create
              projects; only Admins can edit/delete (soft delete enabled).
            </li>
            <li>
              <strong>User Management:</strong> Admins can activate/deactivate
              users, change roles, and view all users.
            </li>
            <li>
              <strong>Secure Authentication:</strong> JWT-based login, password
              hashing, and protected routes.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-800">Tech Stack</h2>
          <p className="text-gray-700">
            <strong>Backend:</strong> Node.js, Express, TypeScript, MongoDB,
            Mongoose
            <br />
            <strong>Frontend:</strong> React, TypeScript, React Query, Tailwind
            CSS
          </p>

          <h2 className="text-2xl font-bold text-gray-800">User Roles</h2>
          <p className="text-gray-700">
            <strong>ADMIN:</strong> Full access (manage users & projects)
            <br />
            <strong>MANAGER:</strong> Can create & view projects, limited
            management
            <br />
            <strong>STAFF:</strong> Can view & create projects only
          </p>

          <p className="text-gray-600 text-sm">
            Built with professional coding practices, clean architecture, and
            secure authentication. Designed for modern web applications
            requiring strict access control and auditability.
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
