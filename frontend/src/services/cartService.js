import axios from "axios";

const API_URL = "http://localhost:3000";

//fetch user cart
export const fetchUserCart = async (authId) => {
  try {
    const response = await axios.get(`${API_URL}/api/cart/${authId}`, {
      withCredentials: true,
    });

    return response?.data || null;
  } catch (error) {
    throw error.response?.data?.message;
  }
};

//add item to cart
export const addToCart = async (productId, quantity) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/cart/add`,
      { productId, quantity },
      {
        withCredentials: true,
      }
    );

    return response?.data || null;
  } catch (error) {
    throw error.response?.data?.message;
  }
};

// remove an item from the cart
export const removeItemFromCart = async ({ productId }) => {
  try {
    const response = await axios.delete(`${API_URL}/api/cart/remove`, {
      data: { productId },
      withCredentials: true, 
    });

    return response.data;
  } catch (error) {

    throw error.response?.data?.message || "Failed to remove item from cart.";
  }
};

// clear all items from cart
export const clearCart = async (authId) => {
  try {
    const response = await axios.delete(`${API_URL}/api/cart/clear/${authId}`, {
      withCredentials: true, 
    });

    return response.data;
  } catch (error) {

    throw error.response?.data?.message || "Failed to remove item from cart.";
  }
};
