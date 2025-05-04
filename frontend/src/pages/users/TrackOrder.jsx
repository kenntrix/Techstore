import { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { Spinner } from "flowbite-react";

const TrackOrders = () => {
  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTrackOrder = async () => {
    if (!orderId) {
      setError("Please enter a valid Order ID.");
      return;
    }

    setError(null);
    setIsLoading(true);

    // Simulated API call (replace with real one)
    setTimeout(() => {
      const fakeData = {
        id: orderId,
        status: "Shipped",
        estimatedDelivery: "May 8, 2025",
      };

      setStatus(fakeData);
      setIsLoading(false);
    }, 1500); // Simulating an API call with a 1.5s delay
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="max-w-3xl w-full p-12 bg-white shadow-xl rounded-lg">
        <h2 className="text-4xl font-semibold mb-8 text-center text-blue-600">
          Track Your Order
        </h2>

        <div className="mb-6">
          <Label
            htmlFor="order-id"
            value="Order ID"
            className="text-lg font-medium"
          />
          <TextInput
            id="order-id"
            placeholder="Enter your order ID"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            required
            className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-xl"
          />
        </div>

        {error && (
          <p className="text-red-500 text-center text-lg mb-6">{error}</p>
        )}

        <Button
          onClick={handleTrackOrder}
          disabled={!orderId || isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 text-xl"
        >
          {isLoading ? (
            <Spinner aria-label="Loading..." size="sm" />
          ) : (
            "Track Order"
          )}
        </Button>

        {status && !isLoading && (
          <div className="mt-8 border-t pt-6 text-gray-700 text-lg">
            <p>
              <strong>Status:</strong> {status.status}
            </p>
            <p>
              <strong>Estimated Delivery:</strong> {status.estimatedDelivery}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrders;
