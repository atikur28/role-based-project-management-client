import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { Link, useLocation } from "react-router";
import { useAuth } from "../../context/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white dark:bg-gray-200 shadow-md">
      <div className="max-w-400 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo & Links */}
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className={`font-bold text-xl hover:text-blue-600 ${
                isActive("/") ? "text-blue-600" : ""
              }`}
            >
              Project Management
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-4">
              {user && (
                <>
                  <Link
                    to="/dashboard"
                    className={`hover:text-blue-500 ${
                      isActive("/dashboard")
                        ? "text-blue-600 font-semibold"
                        : ""
                    }`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/projects"
                    className={`hover:text-blue-500 ${
                      isActive("/projects") ? "text-blue-600 font-semibold" : ""
                    }`}
                  >
                    Projects
                  </Link>
                  {user.role === "ADMIN" && (
                    <>
                      <Link
                        to="/users"
                        className={`hover:text-blue-500 ${
                          isActive("/users")
                            ? "text-blue-600 font-semibold"
                            : ""
                        }`}
                      >
                        Users
                      </Link>
                      <Link
                        to="/invite"
                        className={`hover:text-blue-500 ${
                          isActive("/invite")
                            ? "text-blue-600 font-semibold"
                            : ""
                        }`}
                      >
                        Invite
                      </Link>
                    </>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Right Side Buttons */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="hidden md:flex items-center gap-4">
                <span>
                  {user.name} ({user.role})
                </span>
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-4">
                <Link
                  to="/login"
                  className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition ${
                    isActive("/login") ? "ring-2 ring-blue-600" : ""
                  }`}
                >
                  Login
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setOpen(!open)}
                className="text-black dark:text-gray-500 focus:outline-none p-2 rounded hover:bg-gray-600 dark:hover:bg-gray-700 transition"
              >
                {open ? (
                  <HiX className="h-6 w-6" />
                ) : (
                  <HiMenu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-1 bg-white dark:bg-gray-300">
          {user && (
            <>
              <Link
                to="/dashboard"
                className={`block px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
                  isActive("/dashboard")
                    ? "bg-blue-100 dark:bg-blue-200 font-semibold"
                    : ""
                }`}
                onClick={() => setOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/projects"
                className={`block px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
                  isActive("/projects")
                    ? "bg-blue-100 dark:bg-blue-200 font-semibold"
                    : ""
                }`}
                onClick={() => setOpen(false)}
              >
                Projects
              </Link>
              {user.role === "ADMIN" && (
                <>
                  <Link
                    to="/users"
                    className={`block px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
                      isActive("/users")
                        ? "bg-blue-100 dark:bg-blue-200 font-semibold"
                        : ""
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    Users
                  </Link>
                  <Link
                    to="/invite"
                    className={`block px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
                      isActive("/invite")
                        ? "bg-blue-100 dark:bg-blue-200 font-semibold"
                        : ""
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    Invite
                  </Link>
                </>
              )}
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="w-full text-left px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}

          {!user && (
            <>
              <Link
                to="/login"
                className={`block px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
                  isActive("/login")
                    ? "bg-blue-100 dark:bg-blue-200 font-semibold"
                    : ""
                }`}
                onClick={() => setOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register/your-invite-token"
                className={`block px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
                  isActive("/register/your-invite-token")
                    ? "bg-green-100 dark:bg-green-200 font-semibold"
                    : ""
                }`}
                onClick={() => setOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
