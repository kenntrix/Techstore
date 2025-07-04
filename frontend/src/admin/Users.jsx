import React, { useState, useEffect } from "react";
import { fetchAllUsers, deleteUser } from "../services/userService";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Users() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pageSize = 10;

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchAllUsers();
        setUsers(data.users);
      } catch (err) {
        setError("Failed to load users.");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const getRoleBadge = (role) => {
    const base = "px-2 py-1 text-xs rounded-full font-semibold";
    switch (role) {
      case "Admin":
        return `${base} bg-red-100 text-red-700`;
      case "Merchant":
        return `${base} bg-purple-100 text-purple-700`;
      case "Customer":
      default:
        return `${base} bg-blue-100 text-blue-700`;
    }
  };

  const filtered = users.filter((u) =>
    `${u.username} ${u.email} ${u.role}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filtered.length / pageSize);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (err) {
      alert(err.message || "Delete failed.");
    }
  };

  if (loading) return <p className="text-center py-10">Loading users...</p>;
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manage Users</h1>
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border border-gray-300 px-3 py-1.5 rounded-md shadow-sm focus:ring focus:ring-blue-200 text-sm"
        />
      </div>

      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-6 py-3 text-left font-medium uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left font-medium uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 text-left font-medium uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left font-medium uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left font-medium uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginated.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{user._id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={getRoleBadge(user.role)}>{user.role}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() =>
                      navigate(`/admin/users/edit-user/${user._id}`)
                    }
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {paginated.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-6 text-gray-500 italic"
                >
                  No matching users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center pt-4">
        <p className="text-sm text-gray-600">
          Showing {paginated.length} of {filtered.length} users
        </p>
        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-sm font-medium">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
