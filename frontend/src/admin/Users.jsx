import { useState } from "react";

export default function Users() {
  const [users] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Customer" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Admin" },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "Customer",
    },
    { id: 4, name: "Bob Williams", email: "bob@example.com", role: "Merchant" },
    {
      id: 5,
      name: "Charlie Brown",
      email: "charlie@example.com",
      role: "Admin",
    },
    {
      id: 6,
      name: "Diana Prince",
      email: "diana@example.com",
      role: "Customer",
    },
    { id: 7, name: "Ethan Hunt", email: "ethan@example.com", role: "Merchant" },
    {
      id: 8,
      name: "Fiona Gallagher",
      email: "fiona@example.com",
      role: "Customer",
    },
    {
      id: 9,
      name: "George Martin",
      email: "george@example.com",
      role: "Admin",
    },
    {
      id: 10,
      name: "Hannah Baker",
      email: "hannah@example.com",
      role: "Customer",
    },
    {
      id: 11,
      name: "Ivan Petrov",
      email: "ivan@example.com",
      role: "Customer",
    },
    {
      id: 12,
      name: "Jack Reacher",
      email: "jack@example.com",
      role: "Merchant",
    },
    { id: 13, name: "Karen Page", email: "karen@example.com", role: "Admin" },
    { id: 14, name: "Leo Zhang", email: "leo@example.com", role: "Customer" },
    {
      id: 15,
      name: "Maria Lopez",
      email: "maria@example.com",
      role: "Merchant",
    },
  ]);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

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
    `${u.name} ${u.email} ${u.role}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filtered.length / pageSize);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manage Users</h1>

        {/* Search */}
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

      {/* Users Table */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginated.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={getRoleBadge(user.role)}>{user.role}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <button className="text-blue-600 hover:underline">
                    Edit
                  </button>
                  <button className="text-green-600 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-gray-600">
          Showing {Math.min((page - 1) * pageSize + 1, filtered.length)} to{" "}
          {Math.min(page * pageSize, filtered.length)} of {filtered.length}{" "}
          users
        </p>
        <div className="space-x-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
