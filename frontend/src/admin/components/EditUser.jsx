import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  fetchUserProfile,
  updateUserProfileByAdmin,
} from "../../services/userService";

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
        const result = await fetchUserProfile(id);

        const auth = result.authId || result.data?.authId || {}; // support multiple shapes

        setForm({
          username: auth.username || "",
          email: auth.email || "",
          role: auth.role || "user",
        });

        setLoading(false);
      } catch (err) {
        console.error("Failed to load user:", err);
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
      toast.success("User updated successfully.");
      navigate("/admin/users");
    } catch (err) {
      toast.error(err.message || "Failed to update user.");
    }
  };

  if (loading)
    return <p className="text-center py-10">Loading user details...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded space-y-4">
      <h1 className="text-2xl font-bold">Edit User</h1>

      <input
        type="text"
        name="username"
        value={form.username}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded"
        placeholder="Username"
      />

      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded"
        placeholder="Email"
      />

      <select
        name="role"
        value={form.role}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded"
      >
        <option value="user">User</option>
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
