import { useEffect, useState } from "react";
import { fetchProducts } from "../services/productService";
import ProductCard from "./ProductCard";
import { RingLoader } from "react-spinners";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

const TopSellingSection = () => {
  const [topSellingProducts, setTopSellingProducts] = useState([]); // State for top-selling products
  const [loading, setLoading] = useState(false); // State for loading

  // Fetch top-selling products from the backend API
  useEffect(() => {
    const loadTopSellingProducts = async () => {
      try {
        setLoading(true);
        const fetchedProducts = await fetchProducts({});
        setTopSellingProducts(fetchedProducts);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load top-selling products:", err);
        setLoading(false);
      }
    };

    loadTopSellingProducts();
  }, []);

  return (
    <div className="h-auto py-14 max-w-6xl mx-auto">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black opacity-75 z-50">
          <RingLoader color="#4A90E2" size={100} />
        </div>
      )}

      <h2 className="text-4xl font-semibold text-center mb-6">Top Selling</h2>

      <p className="text-center text-gray-600 max-w-3xl mx-auto mb-8 text-lg">
        Discover our most popular products that customers love the most. These
        top-selling items are selected based on customer purchases and
        satisfaction — trusted by hundreds of shoppers.
      </p>
      {topSellingProducts.length > 0 ? (
        <div className="w-full py-6 px-2 sm:px-4 max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {topSellingProducts.slice(0, 12).map((item) => (
              <ProductCard key={item._id} item={item} />
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <Link to="/products">
              <Button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-400 transition duration-300">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">
          No top-selling products found.
        </p>
      )}
    </div>
  );
};

export default TopSellingSection;
