import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchProducts, deleteProduct } from "../services/productService";
import { toast } from "react-toastify";

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
    } catch{
      toast.error("Failed to load products:");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (!productId) return alert("Cannot delete unsaved product.");
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await deleteProduct(productId);
      toast.success("Product deleted successfully.");
      setProducts((prev) => prev.filter((p) => p._id !== productId));
    } catch{
      toast.error("Failed to delete product");
    }
  };

  if (loading) {
    return <div className="text-center mt-10 text-xl">Loading products...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-6 w-full">
      <div className="flex justify-between items-center">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
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
