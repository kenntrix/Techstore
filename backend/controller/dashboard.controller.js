// controllers/admin.controller.js

import Order from "../models/order.models.js";
import Product from "../models/product.models.js";
import User from "../models/user.models.js";

export const getDashboardStats = async (request, response, next) => {
  try {
    // Fetch data from the database
    const orders = await Order.find().populate("authId", "username");
    const products = await Product.find();
    const users = await User.find();

    // Calculate total sales
    const totalSales = orders.reduce(
      (sum, order) => sum + (order.totalAmount || 0),
      0
    );

    // Get last 4 recent orders
    const recentOrders = orders
      .slice(-4)
      .reverse()
      .map((order) => ({
        id: order._id,
        customer: order.authId?.username || "Unknown",
        total: typeof order.totalAmount === "number" ? order.totalAmount : 0,
        status: order.status || "Pending",
      }));

    // Placeholder for monthly sales data (replace with MongoDB aggregation if needed)
    const salesData = [
      { month: "Jan", sales: 1200, orders: 80 },
      { month: "Feb", sales: 2100, orders: 95 },
      { month: "Mar", sales: 800, orders: 70 },
      { month: "Apr", sales: 1600, orders: 85 },
      { month: "May", sales: 2400, orders: 110 },
      { month: "Jun", sales: 1800, orders: 92 },
    ];

    // Get top 4 selling products
    const topProducts = await Product.find()
      .sort({ sold: -1 })
      .limit(4)
      .select("name sold");

    // Return the dashboard data
    response.status(200).json({
      stats: {
        // backend: controller
        totalSales: Math.round(totalSales),
        orders: orders.length,
        products: products.length,
        users: users.length,
      },
      salesData,
      recentOrders,
      topProducts,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    next(error);
  }
};
