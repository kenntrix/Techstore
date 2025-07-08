import axios from "axios";

const API_URL = "http://localhost:3000";

//login
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/auth/signin`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data?.message;
  }
};

//logout
export const logoutUser = async () => {
  try {
    const response = await axios.post(
      `${API_URL}/api/auth/signout`,
      {},
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Error logging out.";
  }
};

//register new user
export const registerUser = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/signup`, formData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message;
  }
};


//update existing user
export const updateUser = async (formData) => {
  try {
    const response = await axios.put(`${API_URL}/api/auth/update`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data?.message;
  }
};
