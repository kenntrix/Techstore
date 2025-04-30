import React from "react";
import { Link } from "react-router-dom";
import ChargingImage from "../assets/images/products/charger.jpg";
import LaptopsImage from "../assets/images/products/lap.jpg";
import AccessoriesImage from "../assets/images/products/laptopc.jpg";
import PhoneImage from "../assets/images/products/phone.jpg";

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
    <div className="h-auto">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-2">
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
