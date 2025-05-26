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

const stats = [
  {
    title: "Total Sales",
    value: "$12,345",
    icon: <DollarSign className="text-green-500" />,
  },
  {
    title: "Orders",
    value: "567",
    icon: <ShoppingCart className="text-blue-500" />,
  },
  {
    title: "Products",
    value: "89",
    icon: <Box className="text-yellow-500" />,
  },
  {
    title: "Users",
    value: "1,234",
    icon: <Users className="text-purple-500" />,
  },
];

const salesData = [
  { month: "Jan", sales: 1200, orders: 80 },
  { month: "Feb", sales: 2100, orders: 95 },
  { month: "Mar", sales: 800, orders: 70 },
  { month: "Apr", sales: 1600, orders: 85 },
  { month: "May", sales: 2400, orders: 110 },
  { month: "Jun", sales: 1800, orders: 92 },
];

const recentOrders = [
  { id: "#1001", customer: "John Doe", total: "$99.99", status: "Pending" },
  { id: "#1002", customer: "Jane Smith", total: "$149.99", status: "Shipped" },
  {
    id: "#1003",
    customer: "Alice Johnson",
    total: "$89.50",
    status: "Delivered",
  },
  { id: "#1004", customer: "Bob Lee", total: "$120.00", status: "Cancelled" },
];

const topProducts = [
  { name: "Laptops", sold: 320 },
  { name: "Charges", sold: 280 },
  { name: "Accessories", sold: 210 },
  { name: "Phones", sold: 180 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl shadow flex items-center gap-4"
          >
            <div className="bg-gray-100 p-3 rounded-full">{stat.icon}</div>
            <div>
              <h4 className="text-sm text-gray-500">{stat.title}</h4>
              <p className="text-2xl font-semibold">{stat.value}</p>
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
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#4F46E5"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Orders Overview
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Recent Orders
          </h3>
          <table className="w-full text-sm text-left text-gray-600">
            <thead>
              <tr>
                <th className="pb-2">Order ID</th>
                <th className="pb-2">Customer</th>
                <th className="pb-2">Total</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, i) => (
                <tr key={i} className="border-t">
                  <td className="py-2">{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.total}</td>
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

        {/* Top Products */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Top Products
          </h3>
          <ul className="space-y-2">
            {topProducts.map((product, i) => (
              <li
                key={i}
                className="flex justify-between text-sm text-gray-700 border-b pb-2"
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
