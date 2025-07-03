import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import { DollarSign, ShoppingCart, Box, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchDashboardData } from "../services/dashboard";

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const res = await fetchDashboardData();
        setData(res);
      } catch (err) {
        console.error("Failed to fetch dashboard", err);
      } finally {
        setLoading(false);
      }
    };
    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin w-10 h-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  if (!data) return <p className="text-center mt-10">No data available.</p>;

  const stats = [
    {
      title: "Total Sales",
      value: `Kshs. ${data.stats.totalSales.toLocaleString()}`,
      icon: <DollarSign className="text-green-500 w-6 h-6" />,
      color: "bg-green-100",
    },
    {
      title: "Orders",
      value: data.stats.orders,
      icon: <ShoppingCart className="text-blue-500 w-6 h-6" />,
      color: "bg-blue-100",
    },
    {
      title: "Products",
      value: data.stats.products,
      icon: <Box className="text-yellow-500 w-6 h-6" />,
      color: "bg-yellow-100",
    },
    {
      title: "Users",
      value: data.stats.users,
      icon: <Users className="text-purple-500 w-6 h-6" />,
      color: "bg-purple-100",
    },
  ];

  return (
    <div className="space-y-10 p-6 lg:p-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`p-5 rounded-xl shadow flex items-center gap-4 ${stat.color}`}
          >
            <div className="bg-white p-3 rounded-full shadow-md">
              {stat.icon}
            </div>
            <div>
              <h4 className="text-sm text-gray-600 uppercase tracking-wide">
                {stat.title}
              </h4>
              <p className="text-2xl font-semibold text-gray-900">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Sales Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#4F46E5"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Orders Overview
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip />
              <Bar dataKey="orders" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow overflow-x-auto">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Recent Orders
          </h3>
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="text-xs text-gray-500 uppercase">
              <tr>
                <th className="pb-2">Order ID</th>
                <th className="pb-2">Customer</th>
                <th className="pb-2">Total</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.recentOrders.map((order, i) => (
                <tr
                  key={i}
                  className="border-t hover:bg-gray-50 transition-all"
                >
                  <td className="py-2 font-medium">{order.id}</td>
                  <td>{order.customer}</td>
                  <td>Kshs. {(Number(order.total) || 0).toFixed(2)}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.status === "Shipped"
                          ? "bg-blue-100 text-blue-700"
                          : order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Top Products
          </h3>
          <ul className="space-y-3">
            {data.topProducts.map((product, i) => (
              <li
                key={i}
                className="flex justify-between items-center text-sm text-gray-700 border-b pb-2"
              >
                <span>{product.name}</span>
                <span className="font-semibold">{product.sold} sold</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
