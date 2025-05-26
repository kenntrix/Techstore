import { useState } from "react";

export default function Products() {
  const [products] = useState([
    { id: 1, name: "Product A", price: 29.99, stock: 100 },
    { id: 2, name: "Product B", price: 49.99, stock: 50 },
    { id: 3, name: "Product C", price: 29.99, stock: 14 },
    { id: 4, name: "Product D", price: 49.99, stock: 56 },
    { id: 5, name: "Product E", price: 29.99, stock: 150 },
    { id: 6, name: "Product F", price: 443.99, stock: 50 },
    // Placeholder data
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Products</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add Product
        </button>
      </div>

      {/* Products Table */}
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
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">{product.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${product.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{product.stock}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-blue-500 hover:underline mr-4">
                    Edit
                  </button>
                  <button className="text-red-500 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
