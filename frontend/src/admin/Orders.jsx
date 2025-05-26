import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const pageSize = 10;

export default function Orders() {
  const [orders] = useState([
    { id: 1, customer: "John Doe", total: 99.99, status: "Pending" },
    { id: 2, customer: "Jane Smith", total: 149.99, status: "Shipped" },
    { id: 3, customer: "Alice Johnson", total: 79.49, status: "Delivered" },
    { id: 4, customer: "Bob Williams", total: 249.0, status: "Pending" },
    { id: 5, customer: "Charlie Brown", total: 39.99, status: "Cancelled" },
    { id: 6, customer: "Diana Prince", total: 180.75, status: "Shipped" },
    { id: 7, customer: "Ethan Hunt", total: 210.2, status: "Delivered" },
    { id: 8, customer: "Fiona Gallagher", total: 55.6, status: "Pending" },
    { id: 9, customer: "George Martin", total: 320.1, status: "Shipped" },
    { id: 10, customer: "Hannah Baker", total: 112.45, status: "Delivered" },
    { id: 11, customer: "Ivan Petrov", total: 68.9, status: "Pending" },
    { id: 12, customer: "Jack Reacher", total: 154.0, status: "Shipped" },
    { id: 13, customer: "Karen Page", total: 87.3, status: "Delivered" },
    { id: 14, customer: "Leo Zhang", total: 134.99, status: "Pending" },
    { id: 15, customer: "Maria Lopez", total: 200.0, status: "Delivered" },
  ]);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = orders.filter(
    (order) =>
      order.customer.toLowerCase().includes(search.toLowerCase()) ||
      order.status.toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filtered.length / pageSize);

  const getStatusBadge = (status) => {
    const base = "inline-block px-2 py-1 text-xs font-medium rounded-full";
    switch (status) {
      case "Pending":
        return `${base} bg-yellow-100 text-yellow-800`;
      case "Shipped":
        return `${base} bg-blue-100 text-blue-800`;
      case "Delivered":
        return `${base} bg-green-100 text-green-800`;
      case "Cancelled":
        return `${base} bg-red-100 text-red-800`;
      default:
        return base;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manage Orders</h1>
        <input
          type="text"
          placeholder="Search orders..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 px-3 py-1.5 rounded-md shadow-sm focus:ring focus:ring-blue-200 text-sm"
        />
      </div>

      {/* Orders Table */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-6 py-3 text-left font-medium uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left font-medium uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left font-medium uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left font-medium uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left font-medium uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginated.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.customer}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${order.total.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={getStatusBadge(order.status)}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <button className="text-blue-600 hover:underline">
                    View
                  </button>
                  <button className="text-green-600 hover:underline">
                    Update
                  </button>
                </td>
              </tr>
            ))}
            {paginated.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-6 text-gray-500 italic"
                >
                  No matching orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center pt-4">
        <p className="text-sm text-gray-600">
          Showing {paginated.length} of {filtered.length} orders
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-sm font-medium">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
