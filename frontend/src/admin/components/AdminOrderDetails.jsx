import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchOrdersByID } from "../../services/orderService";
import { RingLoader } from "react-spinners";
import { Button } from "flowbite-react";

const AdminOrderDetailsPage = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { orderId } = useParams();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const response = await fetchOrdersByID(orderId);
        setOrder(response.order);
      } catch (err) {
        console.error("Error fetching order:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  return (
    <div className="max-w-5xl mx-auto p-6 shadow-lg rounded-lg my-20 bg-gray-200">
      <h1 className="text-3xl font-bold mb-6">Order Details</h1>

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <RingLoader color="#4A90E2" size={100} />
        </div>
      )}

      {!order && !loading && (
        <p className="text-center text-gray-500">Order not found.</p>
      )}

      {order && (
        <div>
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
          </div>

          <div className="border-b pb-4 mb-6">
            <h3 className="font-semibold mb-2">User Information</h3>
            <p>Name: {order.authId?.username || "N/A"}</p>
            <p>Email: {order.authId?.email || "N/A"}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Items Ordered</h3>
            <ul>
              {order.items.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between mb-2"
                >
                  {item.productId ? (
                    <div className="flex items-center">
                      <img
                        src={item.productId.images?.[0]}
                        alt={item.productId.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="ml-4">
                        <p className="font-medium">{item.productId.name}</p>
                        <p className="text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm italic text-red-600">
                      Product not found (may have been deleted)
                    </div>
                  )}
                  <p className="text-gray-700">
                    Kshs. {(item.price * item.quantity).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <Link to={"/admin/orders"}>
        <Button className="bg-blue-600 mt-14 w-full">Go Back</Button>
      </Link>
    </div>
  );
};

export default AdminOrderDetailsPage;
