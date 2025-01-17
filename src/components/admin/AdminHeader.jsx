import React from "react";
import { useDarkMode } from "../../context/DarkModeContext";

const AdminHeader = ({ title }) => {
  const { isDarkMode } = useDarkMode();
  const adminInfo = JSON.parse(localStorage.getItem("adminInfo")) || {};

  return (
    <div className="flex justify-between items-center mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
        {title}
      </h1>
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {adminInfo.name || "Admin"}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {adminInfo.email}
          </p>
        </div>
        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
          {(adminInfo.name?.[0] || "A").toUpperCase()}
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
