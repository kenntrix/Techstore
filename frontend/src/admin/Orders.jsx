import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "react-toastify";
import { fetchAllOrders, deleteOrder, updateOrderStatus } from "../services/orderService";
import { Link } from "react-router-dom";

const pageSize = 10;

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllOrders();
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError(err || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filtered = orders.filter(
    (order) =>
      order.authId?.username?.toLowerCase().includes(search.toLowerCase()) ||
      order.status?.toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filtered.length / pageSize);

  const handleStatusChange = async (id, newStatus) => {
    try {
      // Update status in the backend
      const updated = await updateOrderStatus(id, newStatus);

      // Then update the local state
      setOrders((prev) =>
        prev.map((order) =>
          order._id === id ? { ...order, status: updated.order.status } : order
        )
      );

      toast.success(`Order #${id} status updated to ${newStatus}`);
    } catch (error) {
      toast.error("Failed to update status.");
      console.error("Status update failed:", error);
    }
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      await deleteOrder(id);
      setOrders((prev) => prev.filter((order) => order._id !== id));
      toast.success("Order deleted successfully.");
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete order.");
    }
  };

  if (loading) return <p className="text-center py-10">Loading orders...</p>;
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">All Orders</h1>
        <input
          type="text"
          placeholder="Search by customer/status..."
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
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{order._id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.authId?.username || "Unknown"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  Kshs.{" "}
                  {order.items
                    ?.reduce(
                      (sum, item) =>
                        sum + (item.productId?.price || 0) * item.quantity,
                      0
                    )
                    .toLocaleString()}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className="border rounded px-2 py-1 text-xs"
                  >
                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <td className="px-6 py-4 whitespace-nowrap space-x-2">
                    <Link
                      to={`/admin/orders/${order._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </Link>

                    <button
                      onClick={() => handleDelete(order._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
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
        {totalPages > 1 && (
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
        )}
      </div>
    </div>
  );
}
