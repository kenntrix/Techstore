import axios from "axios";

const API_URL = "http://localhost:3000";

//create payments
export const createPayments = async (paymentPayload) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/payments/create-payment-intent`,
      paymentPayload,
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching creating payment:", error);
    throw error.response?.data?.message || "Failed to fetch create payment.";
  }
};
