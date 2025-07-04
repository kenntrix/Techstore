import { useEffect, useState } from "react";
import { fetchProducts } from "../services/productService";
import ProductCard from "./ProductCard";
import { RingLoader } from "react-spinners";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

const TopSellingSection = () => {
  const [topSellingProducts, setTopSellingProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadTopSellingProducts = async () => {
      try {
        setLoading(true);
        const fetchedProducts = await fetchProducts({});
        setTopSellingProducts(fetchedProducts);
      } catch (err) {
        console.error("Failed to load top-selling products:", err);
      } finally {
        setLoading(false);
      }
    };

    loadTopSellingProducts();
  }, []);

  return (
    <div className="w-full py-14 px-4 sm:px-6 lg:px-8 bg-gray-50">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <RingLoader color="#4A90E2" size={100} />
        </div>
      )}

      <h2 className="text-4xl font-bold text-center mb-4">Top Selling</h2>

      <p className="text-center text-gray-600 max-w-3xl mx-auto mb-10 text-lg">
        Discover our most popular products that customers love the most. These
        top-selling items are carefully selected based on real customer
        purchases, reviews, and overall satisfaction — trusted by hundreds of
        happy shoppers. Whether you're upgrading your tech, shopping for
        essentials, or looking for reliable everyday gadgets, these bestsellers
        combine quality, value, and performance. Join our community of satisfied
        customers and shop with confidence today!
      </p>

      {topSellingProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {topSellingProducts.slice(0, 8).map((item) => (
              <ProductCard key={item._id} item={item} />
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <Link to="/products">
              <Button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
                View All Products
              </Button>
            </Link>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500 text-lg">
          No top-selling products found.
        </p>
      )}
    </div>
  );
};

export default TopSellingSection;
