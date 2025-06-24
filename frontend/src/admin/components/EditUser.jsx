import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  fetchUserProfile,
  updateUserProfileByAdmin,
} from "../../services/userService";
import "react-toastify/dist/ReactToastify.css";

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    role: "user",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await fetchUserProfile(id);
        setForm({
          username: data?.username ?? "",
          email: data?.email ?? "",
          role: data?.role ?? "user",
        });
        setLoading(false);
      } catch (err) {
        toast.error("Failed to load user.");
        navigate("/admin/users");
      }
    };

    loadUser();
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    try {
      await updateUserProfileByAdmin(id, form);
      toast.success("User updated successfully");
      navigate("/admin/users");
    } catch (err) {
      toast.error(err.message || "Failed to update user");
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto mt-8 space-y-4 bg-white p-6 shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Edit User</h1>

      <input
        type="text"
        name="username"
        value={form.username}
        onChange={handleChange}
        placeholder="Username"
        className="w-full border px-3 py-2 rounded"
      />
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full border px-3 py-2 rounded"
      />
      <select
        name="role"
        value={form.role}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
      >
        <option value="user">Customer</option>
        <option value="admin">Admin</option>
      </select>

      <div className="flex justify-between pt-4">
        <button
          onClick={() => navigate("/admin/users")}
          className="text-gray-500"
        >
          Cancel
        </button>
        <button
          onClick={handleUpdate}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update
        </button>
      </div>
    </div>
  );
}
