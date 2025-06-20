import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchProducts, deleteProduct } from "../services/productService";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      console.error("Failed to load products:", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete
  const handleDelete = async () => {
    if (!formData._id) return alert("Cannot delete unsaved product.");
    if (!window.confirm("Are you sure?")) return;

    try {
      await deleteProduct(formData._id);
      alert("Product deleted.");
    } catch (err) {
      console.error(err);
      alert("Failed to delete product.");
    }
  };

  if (loading) {
    return <div className="text-center mt-10 text-xl">Loading products...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="flex justify-between items-center mb-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold">All Products</h1>
        <button
          onClick={() => navigate("/admin/products/add-product")}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
        >
          + Add Product
        </button>
      </div>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col"
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-48 object-cover"
              />

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <p className="text-sm text-gray-600 truncate">
                    {product.description}
                  </p>
                  <div className="mt-2 text-blue-600 font-bold text-md">
                    Kshs. {product.price.toLocaleString()}
                  </div>
                </div>
                <div className="mt-4 flex justify-between gap-2">
                  <Link
                    to={`/admin/update-product/${product._id}`}
                    className="bg-yellow-500 text-white text-sm px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-600 text-white text-sm px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
