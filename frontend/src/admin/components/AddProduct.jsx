import { useState } from "react";
import { createProduct } from "../../services/productService";
import axios from "axios";

function ProductForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "Laptops",
    images: [], // Initialize as empty array
  });

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
    formDataUpload.append("upload_preset", "techstore_upload"); // Replace this
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dp11cfghy/image/upload", // Replace this
        formDataUpload
      );
      const imageUrl = response.data.secure_url;
      setFormData((prev) => ({ ...prev, images: [...prev.images, imageUrl] }));
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Image upload failed.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", formData.name);
    form.append("description", formData.description);
    form.append("price", formData.price);
    form.append("stock", formData.stock);
    form.append("category", formData.category);

    formData.images.forEach((image) => {
      form.append("images", image);
    });

    try {
      const response = await createProduct(form);
      alert("Success!");
      console.log("Created:", response);
    } catch (err) {
      console.error(err);
      alert("Failed to save");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full sm:w-11/12 md:w-3/4 lg:w-1/2 xl:w-2/5 mx-auto p-4 space-y-6"
    >
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Add New Product
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
        <label className="block font-medium">Upload Images</label>
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
        {formData.images.map((img, index) => (
          <div key={index} className="mt-2 flex items-center space-x-2">
            <img
              src={img}
              alt={`Image ${index + 1}`}
              className="h-16 w-auto border"
            />
            <a
              href={img}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-sm hover:underline"
            >
              🔗 View
            </a>
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
      >
        Submit
      </button>
    </form>
  );
}

export default ProductForm;
