import axios from "axios";

const API_URL = "http://localhost:3000";

export const fetchOrdersByUserID = async (authId) => {
  try {
    const response = await axios.get(`${API_URL}/api/orders/user/${authId}`, {
      withCredentials: true,
    });

    return response?.data || null;
  } catch (error) {
    throw error.response?.data?.message;
  }
};

//fetch orders by ID
export const fetchOrdersByID = async (orderId) => {
  try {
    const response = await axios.get(`${API_URL}/api/orders/${orderId}`, {
      withCredentials: true,
    });

    return response?.data || null;
  } catch (error) {
    throw error.response?.data?.message;
  }
};

//fetch all orders
export const fetchAllOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/orders/`, {
      withCredentials: true,
    });
    return response?.data?.orders || [];
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch all orders";
  }
};

//update order status
export const updateOrderStatus = async (id, newStatus) => {
  try {
    const response = await axios.patch(
      `${API_URL}/api/orders/${id}/status`,
      { status: newStatus },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to update order status.";
  }
};

//delete order
export const deleteOrder = async (orderId) => {
  try {
    const response = await axios.delete(`${API_URL}/api/orders/${orderId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to delete order";
  }
};