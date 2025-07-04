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