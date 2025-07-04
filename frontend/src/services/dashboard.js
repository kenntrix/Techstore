// frontend/src/services/admin.service.js
import axios from "axios";

const API_URL = "http://localhost:3000";

export const fetchDashboardData = async () => {
  const res = await axios.get(`${API_URL}/api/admin/dashboard`, {
    withCredentials: true,
  });
  return res.data;
};
