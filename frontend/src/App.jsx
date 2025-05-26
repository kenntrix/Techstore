import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Public pages
import Homepage from "./pages/Homepage.jsx";
import About from "./pages/AboutPage.jsx";
import LoginPage from "./pages/authentication/LoginPage.jsx";
import RegisterPage from "./pages/authentication/RegisterPage.jsx";
import NavbarHeader from "./components/NavbarHeader.jsx";

// User pages
import OnlyUserPrivateRoute from "./components/OnlyUserPrivateRoute.jsx";
import OrdersPage from "./pages/users/OrdersPage.jsx";
import UserProfilePage from "./pages/users/UserProfilePage.jsx";
import TrackOrder from "./pages/users/TrackOrder.jsx";
import CheckoutPage from "./pages/products/CheckoutPage.jsx";
import FooterSection from "./components/FooterSection.jsx";
import CartPage from "./pages/products/CartPage.jsx";
import ProductItemsPage from "./pages/products/ProductItemsPage.jsx";
import ProductPage from "./pages/products/ProductsPage.jsx";
import OrderSuccessPage from "./pages/products/OrderSuccessPage.jsx";
import OrderDetailsPage from "./pages/users/OrderDetailsPage.jsx";

// Admin pages
import AdminLayout from "./admin/AdminLayout.jsx";
import AdminDashboard from "./admin/Dashboard.jsx";
import Products from "./admin/Products.jsx";
import Orders from "./admin/Orders.jsx";
import Users from "./admin/Users.jsx";
// import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute.jsx";

// Layout for public and user routes
function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <ToastContainer />
      <NavbarHeader />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public and user routes with NavbarHeader, ToastContainer, and Footer */}
        <Route element={<PublicLayout />}>
          {/* Public routes */}
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/product/:id" element={<ProductItemsPage />} />
          <Route path="/products" element={<ProductPage />} />

          {/* User protected routes */}
          <Route element={<OnlyUserPrivateRoute />}>
            <Route path="/my-orders" element={<OrdersPage />} />
            <Route
              path="/my-orders/orders/:id"
              element={<OrderDetailsPage />}
            />
            <Route path="/product/checkout" element={<CheckoutPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route
              path="/product/order-success"
              element={<OrderSuccessPage />}
            />
            <Route path="/track-orders" element={<TrackOrder />} />
            <Route path="/user-profile" element={<UserProfilePage />} />
          </Route>
        </Route>

        {/* Admin routes without NavbarHeader, ToastContainer, or Footer */}
        {/* <Route element={<OnlyAdminPrivateRoute />}> */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/users" element={<Users />} />
        </Route>
        {/* </Route> */}
      </Routes>
      <FooterSection />
    </BrowserRouter>
  );
}
