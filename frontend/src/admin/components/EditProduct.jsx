import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchProductsByID,
  updateProduct,
} from "../../services/productService";
import { toast } from "react-toastify";
import axios from "axios";

function EditProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "Laptops",
    images: [],
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const product = await fetchProductsByID(id);
        setFormData({
          name: product.name || "",
          description: product.description || "",
          price: product.price || "",
          stock: product.stock || "",
          category: product.category || "Laptops",
          images: product.images || [],
        });
      } catch (error) {
        toast.error("Failed to load product data");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = async (file) => {
    const formDataUpload = new FormData();
    formDataUpload.append("file", file);
    formDataUpload.append("upload_preset", "techstore_upload");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dp11cfghy/image/upload",
        formDataUpload
      );
      const imageUrl = response.data.secure_url;
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, imageUrl],
      }));
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("Image upload failed.");
    }
  };

  const handleImageRemove = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      images: updatedImages,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      name: formData.name,
      description: formData.description,
      price: formData.price,
      stock: formData.stock,
      category: formData.category,
      images: formData.images,
    };

    try {
      const response = await updateProduct(id, updatedData);

      toast.success("Product updated successfully!");

      navigate("/admin/products");
      
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update product.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full sm:w-11/12 md:w-3/4 lg:w-1/2 xl:w-2/5 mx-auto p-4 space-y-6"
    >
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Edit Product
      </h2>

      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        required
        className="w-full p-4 border rounded"
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        required
        min="0"
        step="0.01"
        className="w-full p-2 border rounded"
      />

      <input
        type="number"
        name="stock"
        placeholder="Stock Quantity"
        value={formData.stock}
        onChange={handleChange}
        required
        min="0"
        className="w-full p-2 border rounded"
      />

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      >
        <option value="Charging">Charging</option>
        <option value="Laptops">Laptops</option>
        <option value="Accessories">Accessories</option>
        <option value="Phones">Phones</option>
      </select>

      <div className="space-y-2">
        <label className="block font-medium">Upload New Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files[0]) {
              handleFileUpload(e.target.files[0]);
            }
          }}
          className="block w-full border rounded p-2"
        />

        {formData.images.length > 0 && (
          <div className="flex flex-wrap gap-4 mt-4">
            {formData.images.map((img, index) => (
              <div key={index} className="relative">
                <img src={img} alt={`Image ${index}`} className="h-20 border" />
                <button
                  type="button"
                  onClick={() => handleImageRemove(index)}
                  className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2 py-0.5 text-xs"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Save Changes
      </button>
    </form>
  );
}

export default EditProductForm;
