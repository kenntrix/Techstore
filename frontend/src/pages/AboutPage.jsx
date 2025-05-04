import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Banner */}
      <motion.div
        className="relative mb-16"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <img
          src="https://images.unsplash.com/photo-1603791440384-56cd371ee9a7"
          alt="TechStore Banner"
          className="w-full h-[280px] object-cover rounded-2xl shadow-lg"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center px-4">
            Welcome to <span className="text-blue-600 italic">Techstore</span>
          </h1>
        </div>
      </motion.div>

      {/* Introduction */}
      <motion.section
        className="mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-gray-700 text-lg sm:text-xl leading-relaxed text-justify">
          At <span className="font-bold text-blue-600">Techstore</span>, we
          specialize in bringing you the latest gadgets, smart home solutions,
          and digital accessories. Whether you're a tech enthusiast or a casual
          shopper, our platform is designed to offer a seamless, secure, and
          satisfying experience.
        </p>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">
          🚀 Why Choose Us?
        </h2>
        <ul className="space-y-3 pl-5 text-gray-700 list-disc">
          <li>📦 Fast and trackable shipping worldwide</li>
          <li>🔐 Secure payments and encrypted checkout</li>
          <li>🛍️ Thousands of verified product reviews</li>
          <li>💬 24/7 customer support via chat and email</li>
        </ul>
      </motion.section>

      {/* Image Grid Section */}
      <motion.section
        className="mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6">
          🖼️ Explore Our Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              label: "Laptops",
              url: "https://images.unsplash.com/photo-1593642532973-d31b6557fa68",
            },
            {
              label: "Smartphones",
              url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
            },
            {
              label: "Charging",
              url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
            },
            {
              label: "Accessories",
              url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
            },
          ].map(({ label, url }, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-lg shadow-lg"
            >
              <img
                src={url}
                alt={label}
                className="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white text-lg font-semibold">
                {label}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Vision Section */}
      <motion.section
        className="mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">
          🌍 Our Mission
        </h2>
        <p className="text-gray-700 text-lg sm:text-xl leading-relaxed text-justify">
          We envision a world where technology is simple, stylish, and smart.
          Our mission is to empower individuals by offering accessible tech
          solutions that enhance everyday life.{" "}
          <span className="font-medium text-blue-600">Techstore </span>
          is committed to constant innovation, customer satisfaction, and
          community growth.
        </p>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
      >
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">
          📬 Get in Touch
        </h2>
        <div className="text-gray-700 text-lg sm:text-xl space-y-2">
          <p>
            📧 Email:{" "}
            <a
              href="mailto:support@techstore.com"
              className="text-blue-600 underline"
            >
              support@techstore.com
            </a>
          </p>
          <p>📞 Phone: +1 (555) 123-4567</p>
          <p>📍 Location: 123 TechStreet, Silicon Valley, CA</p>
        </div>
      </motion.section>
    </div>
  );
};

export default About;
