import React from "react";
import { Link } from "react-router-dom";
import ChargingImage from "../assets/images/products/laptop.jpg";
import LaptopsImage from "../assets/images/products/desktop.jpg";
import AccessoriesImage from "../assets/images/products/iphone.jpg";
import PhoneImage from "../assets/images/products/apple.jpeg";

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
    <div className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-screen-2xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">
          Shop by Category
        </h2>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto text-lg">
          Browse our diverse range of product categories to find exactly what
          you need — whether it’s the latest smartphones, powerful laptops,
          essential accessories, or reliable charging solutions. We’ve curated
          collections to suit every lifestyle and budget, ensuring quality,
          durability, and performance. Start exploring now and discover the
          perfect tech for work, school, entertainment, or everyday use.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-2xl shadow hover:shadow-lg transition-all duration-300"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-xl font-semibold mb-2">
                  {category.name}
                </span>
                <Link
                  to={`/products?type=${encodeURIComponent(category.name)}`}
                  className="text-white bg-yellow-500 hover:bg-yellow-600 text-sm font-medium px-4 py-2 rounded-md transition"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesSection;
