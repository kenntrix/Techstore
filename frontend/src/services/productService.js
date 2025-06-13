import axios from "axios";

const API_URL = "http://localhost:3000";

//Fetch all products
export const fetchProducts = async (filters = {}) => {
  try {
    let queryParams = new URLSearchParams();

    if (filters.searchTerm)
      queryParams.append("searchTerm", filters.searchTerm);
    if (filters.inStock) queryParams.append("inStock", "true");
    if (filters.outOfStock) queryParams.append("outOfStock", "true");

    const selectedTypes = Object.keys(filters.selectedType || {}).filter(
      (key) => filters.selectedType[key]
    );
    if (selectedTypes.length > 0)
      queryParams.append("productTypes", selectedTypes.join(","));

    if (filters.sortOrder) queryParams.append("sort", filters.sortOrder);
    if (filters.limit) queryParams.append("limit", filters.limit);

    const response = await axios.get(
      `${API_URL}/api/products?${queryParams.toString()}`
    );

    return Array.isArray(response?.data?.products)
      ? response.data.products
      : [];
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error.response?.data?.errorMessage || "Failed to fetch products.";
  }
};

//fetch procuct by Id
export const fetchProductsByID = async (productID) => {
  try {
    const response = await axios.get(`${API_URL}/api/products/${productID}`);

    return response?.data || null;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error.response?.data?.errorMessage;
  }
};

// Add a new product
export const createProduct = async (productData) => {
  const res = await axios.post(`${API_URL}/api/products/add-product`, productData, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

// Update an existing product
export const updateProduct = async (id, formData) => {
  const res = await axios.put(`${API_URL}api/products/update-product/${id}`, formData, {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// Delete a product
export const deleteProduct = async (id) => {
  const res = await axios.delete(`${API_URL}api/products/${id}`, {
    withCredentials: true,
  });
  return res.data;
};
