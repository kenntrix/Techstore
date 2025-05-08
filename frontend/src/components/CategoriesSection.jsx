import React from "react";
import { Link } from "react-router-dom";
import ChargingImage from "../assets/images/products/laptop.jpg";
import LaptopsImage from "../assets/images/products/desktop.jpg";
import AccessoriesImage from "../assets/images/products/iphone.jpg";
import PhoneImage from "../assets/images/products/lap.jpg";

const CategoriesSection = () => {
  const categories = [
    {
      name: "Charging",
      image: ChargingImage,
      link: "/category/charging",
    },
    {
      name: "Laptops",
      image: LaptopsImage,
      link: "/category/laptops",
    },
    {
      name: "Accessories",
      image: AccessoriesImage,
      link: "/category/accessories",
    },
    {
      name: "Phones",
      image: PhoneImage,
      link: "/category/phones",
    },
  ];

  return (
    <div className="h-auto py-10 max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-semibold text-center mb-4">
        Shop by Category
      </h2>
      <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
        Browse our product categories to find exactly what you need — whether
        it's phones, laptops, accessories, or charging gear. Start exploring
        now!
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-6">
        {categories.map((category, index) => (
          <div key={index} className="relative group overflow-hidden">
            {/* Category Image */}
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            {/* Overlay Text */}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Link
                to={category.link}
                className="text-white text-lg font-semibold bg-yellow-500 px-4 py-2 rounded-md hover:bg-yellow-600 transition"
              >
                Shop Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
