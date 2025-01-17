import React from "react";
import Sidebar from "./Sidebar";
import { useDarkMode } from "../../context/DarkModeContext";

const AdminLayout = ({ children }) => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <main className="flex-1 p-8 transition-colors duration-200">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
