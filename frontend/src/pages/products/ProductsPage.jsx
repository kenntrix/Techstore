import { useEffect, useState } from "react";
import { RingLoader } from "react-spinners";
import { fetchProducts } from "../../services/productService";
import ProductCard from "../../components/ProductCard";

const ProductPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAvailability, setSelectedAvailability] = useState({
    inStock: false,
    outOfStock: false,
  });
  const [selectedType, setSelectedType] = useState({
    Charging: false,
    Laptops: false,
    Accessories: false,
    Phones: false,
  });
  const [sortOrder, setSortOrder] = useState("createdAt_desc");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const filters = {
        searchTerm,
        ...selectedAvailability,
        selectedType,
        sortOrder,
      };
      const fetchedProducts = await fetchProducts(filters);
      setProducts(fetchedProducts);
      setLoading(false);
    };

    loadProducts();
  }, [searchTerm, selectedAvailability, selectedType, sortOrder]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setSelectedAvailability((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  const handleTypeChange = (e) => {
    const { id, checked } = e.target;
    setSelectedType((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  const resetAvailability = () => {
    setSelectedAvailability({ inStock: false, outOfStock: false });
  };

  const resetTypes = () => {
    setSelectedType({
      Charging: false,
      Laptops: false,
      Accessories: false,
      Phones: false,
    });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <RingLoader color="#4A90E2" size={100} />
        </div>
      )}

      {/* Mobile Toggle Button */}
      <div className="md:hidden p-4 bg-white shadow">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`w-full md:w-1/4 bg-gray-50 border-r transition-all duration-300 ease-in-out ${
          showFilters ? "block" : "hidden"
        } md:block`}
      >
        <form className="flex flex-col gap-6 p-4 md:sticky md:top-0">
          <h1 className="font-bold text-2xl text-center text-blue-700 border-b pb-2">
            🔍 Filter Products
          </h1>

          {/* Search */}
          <div className="flex flex-col">
            <label htmlFor="searchTerm" className="text-sm font-medium">
              Search
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="mt-1 border rounded px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Availability */}
          <div className="bg-white shadow rounded p-4">
            <h2 className="text-blue-600 font-semibold mb-2">
              📦 Availability
            </h2>
            {["inStock", "outOfStock"].map((item) => (
              <div key={item} className="flex items-center gap-2 mb-1">
                <input
                  type="checkbox"
                  id={item}
                  checked={selectedAvailability[item]}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4"
                />
                <label htmlFor={item} className="capitalize">
                  {item === "inStock" ? "In Stock" : "Out of Stock"}
                </label>
              </div>
            ))}
            <button
              type="button"
              onClick={resetAvailability}
              className="text-sm text-gray-400 hover:text-red-500 mt-2 underline"
            >
              Reset Availability
            </button>
          </div>

          {/* Product Type */}
          <div className="bg-white shadow rounded p-4">
            <h2 className="text-blue-600 font-semibold mb-2">
              🛒 Product Types
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(selectedType).map((type) => (
                <div key={type} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={type}
                    checked={selectedType[type]}
                    onChange={handleTypeChange}
                    className="w-4 h-4"
                  />
                  <label htmlFor={type} className="capitalize">
                    {type}
                  </label>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={resetTypes}
              className="text-sm text-gray-400 hover:text-red-500 mt-2 underline"
            >
              Reset Types
            </button>
          </div>

          {/* Sorting */}
          <div className="bg-white shadow rounded p-4">
            <h2 className="text-blue-600 font-semibold mb-2">
              🔽 Sort Products
            </h2>
            <select
              id="sortOrder"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border rounded px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="price_desc">💰 Price: High to Low</option>
              <option value="price_asc">💵 Price: Low to High</option>
              <option value="createdAt_desc">🆕 Newest</option>
              <option value="createdAt_asc">📅 Oldest</option>
            </select>
          </div>
        </form>
      </aside>

      {/* Product Grid */}
      <main className="w-full md:w-3/4 p-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Tech Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((item) => <ProductCard key={item._id} item={item} />)
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProductPage;
