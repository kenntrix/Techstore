import axios from "axios";

const API_URL = "http://localhost:3000";

// fetching all users

export const fetchAllUsers = async () => {
  const response = await axios.get(`${API_URL}/api/users/getUsers`, {
    withCredentials: true,
  });

  return response.data;
};

// Fetch user profile
export const fetchUserProfile = async (authId) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/users/getUserProfile/${authId}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch user profile.";
  }
};

// Update a new user profile
export const updateUserProfile = async (formData) => {
  try {
    const response = await axios.put(`${API_URL}/api/users/update`, formData, {
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

// Update user profile by admin
export const updateUserProfileByAdmin = async (authId, formData) => {
  try {
    const response = await axios.put(
      `${API_URL}/api/users/admin/user/${authId}`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {

    throw new Error(
      error.response?.data?.message || "Failed to update user profile by admin."
    );
  }
};

//delete user
export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/api/users/delete/${userId}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to delete user.";
  }
};
