// src/components/ProductForm.jsx
import React, { useState } from "react";

export default function ProductForm({ initialData = {}, onSubmit }) {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    description: initialData.description || "",
    price: initialData.price || "",
    stock: initialData.stock || "",
    category: initialData.category || "Laptops",
    images: [],
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setFormData({ ...formData, images: files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in formData) {
      if (key === "images") {
        Array.from(formData.images).forEach((file) =>
          data.append("images", file)
        );
      } else {
        data.append(key, formData[key]);
      }
    }
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" className="input" required />
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="input" required />
      <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Price" className="input" required />
      <input name="stock" type="number" value={formData.stock} onChange={handleChange} placeholder="Stock" className="input" required />
      <select name="category" value={formData.category} onChange={handleChange} className="input">
        <option value="Charging">Charging</option>
        <option value="Laptops">Laptops</option>
        <option value="Accessories">Accessories</option>
        <option value="Phones">Phones</option>
      </select>
      <input name="images" type="file" multiple onChange={handleChange} className="input" />
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
}
