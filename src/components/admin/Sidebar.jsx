import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDarkMode } from "../../context/DarkModeContext";

const Sidebar = ({ onCollapse }) => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminInfo");
    navigate("/admin/login");
  };

  const handleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    onCollapse?.(newState);
  };

  return (
    <div
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } fixed min-h-screen bg-gray-100 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-lg text-gray-800 dark:text-gray-200 p-4 flex flex-col transition-all duration-300`}
    >
      {/* Logo and Controls */}
      <div
        className={`flex ${
          isCollapsed ? "justify-center" : "justify-between"
        } mb-8`}
      >
        {!isCollapsed && (
          <Link
            to="/"
            className="text-xl font-serif text-gray-900 dark:text-white"
          >
            Nest & Noir
          </Link>
        )}
        <div
          className={`flex ${
            isCollapsed ? "flex-col-reverse" : ""
          } items-center space-x-2 ${isCollapsed ? "space-x-0 space-y-2" : ""}`}
        >
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {isDarkMode ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>
          <button
            onClick={handleCollapse}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <svg
              className={`w-5 h-5 transition-transform ${
                isCollapsed ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg>
          </button>
        </div>
      </div>

      <nav className="flex-grow">
        <NavLink
          to="/admin/stats"
          className={({ isActive }) =>
            `flex items-center ${
              isCollapsed ? "justify-center" : ""
            } py-2 px-4 rounded mb-2 ${
              isActive
                ? "bg-gray-200 dark:bg-gray-700"
                : "hover:bg-gray-200 dark:hover:bg-gray-700"
            }`
          }
        >
          <svg
            className={`w-6 h-6 ${!isCollapsed && "mr-3"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          {!isCollapsed && "Statistics"}
        </NavLink>

        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            `flex items-center ${
              isCollapsed ? "justify-center" : ""
            } py-2 px-4 rounded mb-2 ${
              isActive
                ? "bg-gray-200 dark:bg-gray-700"
                : "hover:bg-gray-200 dark:hover:bg-gray-700"
            }`
          }
        >
          <svg
            className={`w-6 h-6 ${!isCollapsed && "mr-3"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
          {!isCollapsed && "Products"}
        </NavLink>

        <NavLink
          to="/admin/featured"
          className={({ isActive }) =>
            `flex items-center ${
              isCollapsed ? "justify-center" : ""
            } py-2 px-4 rounded mb-2 ${
              isActive
                ? "bg-gray-200 dark:bg-gray-700"
                : "hover:bg-gray-200 dark:hover:bg-gray-700"
            }`
          }
        >
          <svg
            className={`w-6 h-6 ${!isCollapsed && "mr-3"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
          {!isCollapsed && "Featured Items"}
        </NavLink>

        <NavLink
          to="/admin/collections"
          className={({ isActive }) =>
            `flex items-center ${
              isCollapsed ? "justify-center" : ""
            } py-2 px-4 rounded mb-2 ${
              isActive
                ? "bg-gray-200 dark:bg-gray-700"
                : "hover:bg-gray-200 dark:hover:bg-gray-700"
            }`
          }
        >
          <svg
            className={`w-6 h-6 ${!isCollapsed && "mr-3"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          {!isCollapsed && "Collections"}
        </NavLink>
      </nav>

      <button
        onClick={handleLogout}
        className={`mt-auto flex items-center ${
          isCollapsed ? "justify-center" : ""
        } py-2 px-4 rounded-lg bg-red-100 dark:bg-red-900 hover:bg-red-200 dark:hover:bg-red-800 text-red-600 dark:text-red-200 transition-colors duration-200`}
      >
        <svg
          className={`w-6 h-6 ${!isCollapsed && "mr-3"}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
        {!isCollapsed && "Logout"}
      </button>
    </div>
  );
};

export default Sidebar;
