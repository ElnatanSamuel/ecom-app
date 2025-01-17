import React, { useState, useEffect } from "react";
import { getDashboardStats } from "../../services/adminApi";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
import { useDarkMode } from "../../context/DarkModeContext";
import AdminHeader from "../../components/admin/AdminHeader";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ArcElement,
  Tooltip,
  Legend
);

const Stats = () => {
  const { isDarkMode } = useDarkMode();
  const [stats, setStats] = useState({
    totalProducts: 0,
    featuredProducts: 0,
    inStockProducts: 0,
    inventoryValue: 0,
    categoryDistribution: {},
    recentSales: [],
    topSellingProducts: [],
    monthlyRevenue: [],
    averageOrderValue: 0,
    totalOrders: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data || {});
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  const categoryChartData =
    stats.categoryDistribution &&
    Object.keys(stats.categoryDistribution).length > 0
      ? {
          labels: Object.keys(stats.categoryDistribution),
          datasets: [
            {
              data: Object.values(stats.categoryDistribution),
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
              ],
            },
          ],
        }
      : null;

  const salesChartData =
    stats.recentSales?.length > 0
      ? {
          labels: stats.recentSales.map((sale) => sale.date),
          datasets: [
            {
              label: "Sales",
              data: stats.recentSales.map((sale) => sale.amount),
              fill: false,
              borderColor: isDarkMode ? "#60A5FA" : "#3B82F6",
              backgroundColor: isDarkMode ? "#60A5FA" : "#3B82F6",
              tension: 0.1,
            },
          ],
        }
      : null;

  const monthlyRevenueData =
    stats.monthlyRevenue?.length > 0
      ? {
          labels: stats.monthlyRevenue.map((item) => item.month),
          datasets: [
            {
              label: "Monthly Revenue",
              data: stats.monthlyRevenue.map((item) => item.amount),
              fill: false,
              borderColor: isDarkMode ? "#60A5FA" : "#3B82F6",
              backgroundColor: isDarkMode ? "#60A5FA" : "#3B82F6",
              tension: 0.1,
            },
          ],
        }
      : null;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: isDarkMode ? "#D1D5DB" : "#4B5563",
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: isDarkMode ? "#374151" : "#E5E7EB",
        },
        ticks: {
          color: isDarkMode ? "#D1D5DB" : "#4B5563",
        },
      },
      y: {
        grid: {
          color: isDarkMode ? "#374151" : "#E5E7EB",
        },
        ticks: {
          color: isDarkMode ? "#D1D5DB" : "#4B5563",
          callback: (value) => `$${value}`,
        },
      },
    },
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <AdminHeader title="Statistics Dashboard" />
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
              Total Products
            </h3>
            <p className="text-3xl font-semibold mt-2 text-gray-900 dark:text-white">
              {stats.totalProducts || 0}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
              Featured Products
            </h3>
            <p className="text-3xl font-semibold mt-2 text-gray-900 dark:text-white">
              {stats.featuredProducts || 0}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
              In Stock Products
            </h3>
            <p className="text-3xl font-semibold mt-2 text-gray-900 dark:text-white">
              {stats.inStockProducts || 0}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
              Inventory Value
            </h3>
            <p className="text-3xl font-semibold mt-2 text-gray-900 dark:text-white">
              ${(stats.inventoryValue || 0).toFixed(2)}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
              Total Orders
            </h3>
            <p className="text-3xl font-semibold mt-2 text-gray-900 dark:text-white">
              {stats.totalOrders || 0}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
              Average Order Value
            </h3>
            <p className="text-3xl font-semibold mt-2 text-gray-900 dark:text-white">
              ${(stats.averageOrderValue || 0).toFixed(2)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {categoryChartData && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Category Distribution
              </h3>
              <div className="h-[300px]">
                <Doughnut data={categoryChartData} options={chartOptions} />
              </div>
            </div>
          )}
          {salesChartData && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Recent Sales
              </h3>
              <div className="h-[300px]">
                <Line data={salesChartData} options={chartOptions} />
              </div>
            </div>
          )}
        </div>

        {monthlyRevenueData && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Monthly Revenue
            </h3>
            <div className="h-[300px]">
              <Line data={monthlyRevenueData} options={chartOptions} />
            </div>
          </div>
        )}

        {stats.topSellingProducts?.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <h3 className="text-lg font-semibold p-6 text-gray-900 dark:text-white">
              Top Selling Products
            </h3>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Units Sold
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Revenue
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {stats.topSellingProducts.map((product) => (
                  <tr key={product._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {product.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {product.unitsSold}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      ${product.revenue.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stats;
