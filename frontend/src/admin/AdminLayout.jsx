import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { signUpSuccess } from "../redux/reducers/authSlice"; 

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    dispatch(signUpSuccess());
    localStorage.removeItem("persist:root"); 
    navigate("/login");
  };

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: <LayoutDashboard size={18} /> },
    { name: "Products", path: "/admin/products", icon: <Package size={18} /> },
    { name: "Orders", path: "/admin/orders", icon: <ShoppingBag size={18} /> },
    { name: "Users", path: "/admin/users", icon: <Users size={18} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <ToastContainer />

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 text-white transition-transform duration-300 ease-in-out md:translate-x-0 md:static`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold tracking-wide">Techstore Admin</h2>
          <button
            className="md:hidden focus:outline-none"
            onClick={toggleSidebar}
          >
            <X size={20} />
          </button>
        </div>
        <nav className="mt-6 space-y-4 px-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 py-4 px-4 rounded-md hover:bg-gray-800 transition ${
                  isActive ? "bg-gray-800 font-semibold" : "text-gray-300"
                }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center sticky top-0 z-30">
          <button
            className="md:hidden text-gray-800 focus:outline-none"
            onClick={toggleSidebar}
          >
            <Menu size={24} />
          </button>
          <div className="text-xl font-semibold">E-Commerce</div>
          <div className="flex items-center gap-4">
            <div className="hidden md:block text-gray-600 text-sm">
              admin@example.com
            </div>
            <button
              className="flex items-center gap-2 bg-red-500 text-white px-3 py-1.5 rounded-md hover:bg-red-600 text-sm"
              onClick={handleLogout}
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
