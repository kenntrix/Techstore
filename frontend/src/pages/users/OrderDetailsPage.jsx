import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  fetchOrdersByID,
  updateOrderStatus,
} from "../../services/orderService";
import { RingLoader } from "react-spinners";
import { Button, Select } from "flowbite-react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const OrderDetailsPage = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newStatus, setNewStatus] = useState("");
  const { id } = useParams();
  const { currentUser } = useSelector((state) => state.authentication);

  const statusSteps = ["pending", "processing", "shipped", "delivered"];

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const response = await fetchOrdersByID(id);
        setOrder(response.order);
        setNewStatus(response.order.status);
      } catch (err) {
        console.error("Error fetching order:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  const handleStatusUpdate = async () => {
    try {
      const response = await updateOrderStatus(id, newStatus);
      setOrder((prev) => ({ ...prev, status: response.order.status }));
      toast.success("Order status updated successfully.");
    } catch (err) {
      console.error("Error updating status:", err);
      toast.error("Failed to update order status.");
    }
  };

  const getStepStatus = (step) => {
    if (!order) return "pending";
    const currentIndex = statusSteps.indexOf(order.status?.toLowerCase());
    const stepIndex = statusSteps.indexOf(step);
    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "current";
    return "upcoming";
  };

  return (
    <div className="max-w-5xl mx-auto p-6 shadow-lg rounded-lg my-20 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Order Details</h1>

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black opacity-75 z-50">
          <RingLoader color="#4A90E2" size={100} />
        </div>
      )}

      {!order && !loading && (
        <p className="text-center text-gray-500">Order not found.</p>
      )}

      {order && (
        <>
          <div className="border-b pb-4 mb-6">
            <h2 className="text-xl font-semibold mb-2">Order #{order._id}</h2>
            <p className="text-sm text-gray-500">
              Placed on: {new Date(order.createdAt).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500">
              Total Amount: Kshs. {order.totalAmount.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">
              Payment Status: {order.paymentStatus}
            </p>
            <p className="text-sm text-gray-500 capitalize">
              Current Status: {order.status}
            </p>
          </div>

          {/* Admin Status Update */}
          {currentUser?.user?.role === "admin" && (
            <div className="mb-10">
              <h3 className="text-lg font-semibold mb-2">
                Update Order Status
              </h3>
              <div className="flex items-center gap-4">
                <Select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-1/2"
                >
                  {statusSteps.map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </Select>
                <Button onClick={handleStatusUpdate} className="bg-blue-600">
                  Update
                </Button>
              </div>
            </div>
          )}

          {/* Tracking Progress */}
          <div className="mb-10">
            <h3 className="font-semibold mb-4 text-lg">Tracking Progress</h3>
            <div className="flex justify-between items-center">
              {statusSteps.map((step, idx) => {
                const stepState = getStepStatus(step);
                return (
                  <div
                    key={idx}
                    className="flex-1 text-center relative flex flex-col items-center"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center z-10
                      ${
                        stepState === "completed"
                          ? "bg-green-500 text-white"
                          : stepState === "current"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-300 text-gray-600"
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <span className="mt-2 capitalize text-sm">{step}</span>
                    {idx < statusSteps.length - 1 && (
                      <div className="absolute top-5 left-full w-full h-1 bg-gray-300 z-0">
                        <div
                          className={`h-1 ${
                            getStepStatus(statusSteps[idx + 1]) !== "upcoming"
                              ? "bg-green-500"
                              : "bg-gray-300"
                          }`}
                          style={{ width: "100%" }}
                        ></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* User Info */}
          <div className="border-b pb-4 mb-6">
            <h3 className="font-semibold mb-2">User Information</h3>
            <p>Name: {order.authId?.username || "N/A"}</p>
            <p>Email: {order.authId?.email || "N/A"}</p>
          </div>

          {/* Items Ordered */}
          <div>
            <h3 className="font-semibold mb-2">Items Ordered</h3>
            <ul>
              {order.items.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between mb-2"
                >
                  <div className="flex items-center">
                    <img
                      src={item.productId.images[0]}
                      alt={item.productId.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="ml-4">
                      <p className="font-medium">{item.productId.name}</p>
                      <p className="text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    Kshs. {(item.price * item.quantity).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      <Link to="/my-orders">
        <Button className="bg-blue-600 mt-14 w-full">Go Back</Button>
      </Link>
    </div>
  );
};

export default OrderDetailsPage;
