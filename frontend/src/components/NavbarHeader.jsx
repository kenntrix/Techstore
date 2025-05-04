import { HiOutlineShoppingBag } from "react-icons/hi2";
import { Dropdown, Navbar, Avatar, Button } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { FaTruck } from "react-icons/fa6";
import { LuLogOut, LuPackage, LuUser } from "react-icons/lu";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logoutUser } from "../services/authService";
import {
  clearAuthentication,
  signoutSuccess,
} from "../redux/reducers/authSlice";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { fetchUserCart, removeItemFromCart } from "../services/cartService";
import { RiDeleteBack2Line } from "react-icons/ri";

const NavbarHeader = () => {
  const { currentUser } = useSelector((state) => state.authentication);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const authId = currentUser?.user._id;

  const handleSignout = async () => {
    try {
      const data = await logoutUser();
      toast.success(data.message);
      dispatch(signoutSuccess());
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred");
    }
  };

  const fetchCart = async (authId) => {
    try {
      const response = await fetchUserCart(authId);
      if (!response.cart) throw new Error("Failed to fetch cart data.");
      setCartItems(response.cart.items);
    } catch (err) {
      if (
        err === "Your session has expired. Please login again." ||
        err === "You are not logged in. Please login or register." ||
        err === "Invalid token. Please login again."
      ) {
        dispatch(clearAuthentication());
      }
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const response = await removeItemFromCart({ productId });
      if (!response.success) throw new Error(response.message);
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.productId !== productId)
      );
      await fetchCart(authId);
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error(error.message || "Failed to remove item from cart.");
    }
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchCart(authId);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    fetchCart(authId);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [authId]);

  const baseStyle = "text-gray-600 transition-all duration-200";
  const hoverStyle = "hover:text-blue-500 hover:text-lg";
  const activeStyle = "font-bold text-blue-700";

  const navLinkClass = (path) =>
    `${baseStyle} ${hoverStyle} ${
      location.pathname === path ? activeStyle : ""
    }`;

  return (
    <Navbar fluid className="border-b-2 shadow-lg">
      <div className="w-full lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center px-[10vh]">
            <Navbar.Brand href="/">
              <span className="self-center whitespace-nowrap text-2xl font-semibold italic">
                Techstore <span className="text-red-500 italic">Shop.</span>
              </span>
            </Navbar.Brand>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-6 items-center">
            <Link to="/" className={navLinkClass("/")}>
              Home
            </Link>
            <Link to="/products" className={navLinkClass("/products")}>
              Products
            </Link>
            {!currentUser && (
              <>
                <Link to="/login" className={navLinkClass("/login")}>
                  Sign In
                </Link>
                <Link to="/register" className={navLinkClass("/register")}>
                  Register
                </Link>
              </>
            )}
            {currentUser && (
              <>
                <Link
                  to="/user-profile"
                  className={navLinkClass("/user-profile")}
                >
                  Profile
                </Link>
                <Link to="/my-orders" className={navLinkClass("/my-orders")}>
                  My Orders
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 focus:outline-none text-2xl"
            >
              {isMobileMenuOpen ? "✖" : "☰"}
            </button>
          </div>

          <div className="flex items-center lg:gap-3">
            <div>
              <CartDropdown
                cartItems={cartItems}
                handleRemoveItem={handleRemoveItem}
              />
            </div>
            <div>
              <UserDropdown
                handleSignout={handleSignout}
                currentUser={currentUser}
              />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden flex flex-col gap-3 mt-3 px-4">
            <Link to="/" className={navLinkClass("/")}>
              Home
            </Link>
            <Link to="/products" className={navLinkClass("/products")}>
              Products
            </Link>
            {!currentUser && (
              <>
                <Link to="/login" className={navLinkClass("/login")}>
                  Sign In
                </Link>
                <Link to="/register" className={navLinkClass("/register")}>
                  Register
                </Link>
              </>
            )}
            {currentUser && (
              <>
                <Link
                  to="/user-profile"
                  className={navLinkClass("/user-profile")}
                >
                  Profile
                </Link>
                <Link to="/my-orders" className={navLinkClass("/my-orders")}>
                  My Orders
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </Navbar>
  );
};

const CartDropdown = ({ cartItems, handleRemoveItem }) => {
  return (
    <Dropdown
      arrowIcon={false}
      inline
      label={
        <span className="p-2 hover:bg-gray-100 rounded-full">
          <span className="sr-only">Cart</span>
          <HiOutlineShoppingBag className="text-2xl text-gray-500 hover:text-gray-900" />
        </span>
      }
      className="w-[24rem] p-3"
    >
      {cartItems.map((item, index) => {
        const product = item.productId;
        if (!product || !product.images || !product.name || !product.price)
          return null;
        return (
          <Dropdown.Item
            key={index}
            className="flex items-center justify-between border border-gray-200 bg-white shadow-md hover:bg-gray-50"
          >
            <div className="w-1/4 flex justify-center">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-12 h-12 object-cover"
              />
            </div>
            <div className="w-1/2 flex flex-col text-left">
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-gray-500">${product.price}</p>
            </div>
            <div className="w-1/4 flex justify-center">
              <span
                onClick={() => handleRemoveItem(product._id)}
                className="text-red-500 hover:text-red-700 focus:outline-none"
              >
                <RiDeleteBack2Line className="text-xl" />
              </span>
            </div>
          </Dropdown.Item>
        );
      })}

      <Dropdown.Divider className="py-1" />

      <Dropdown.Header>
        <div className="flex justify-between">
          <Link to="/cart">
            <Button color="gray" className="px-4">
              View Cart
            </Button>
          </Link>
          <Link to="/product/checkout">
            <Button className="bg-yellow-400 px-4">Check out</Button>
          </Link>
        </div>
      </Dropdown.Header>
    </Dropdown>
  );
};

const UserDropdown = ({ handleSignout, currentUser }) => {
  return (
    <Dropdown
      arrowIcon={false}
      inline
      label={
        <span>
          <span className="sr-only">User menu</span>
          <Avatar alt="" rounded size="sm" />
        </span>
      }
      className="w-56"
    >
      <Dropdown.Header>
        {currentUser ? (
          <>
            <span className="block text-sm">
              Username:{" "}
              <span className="underline italic">
                {currentUser.user.username}
              </span>
            </span>
            <span className="block truncate text-sm font-medium">
              {currentUser.user.email}
            </span>
          </>
        ) : (
          <div className="flex justify-between">
            <Link to="/login">
              <Button color="gray">Sign in</Button>
            </Link>
            <Link to="/register">
              <Button color="blue">Register</Button>
            </Link>
          </div>
        )}
      </Dropdown.Header>
      {currentUser && (
        <>
          <Link to="/track-orders">
            <Dropdown.Item className="flex item-center px-2 py-4">
              <FaTruck className="mx-4 h-5 w-5" />
              Track your Order
            </Dropdown.Item>
          </Link>
          <Link to="/my-orders">
            <Dropdown.Item className="flex item-center px-2 py-4">
              <LuPackage className="mx-4 h-5 w-5" />
              My Orders
            </Dropdown.Item>
          </Link>
          <Link to="/user-profile">
            <Dropdown.Item className="flex item-center px-2 py-4">
              <LuUser className="mx-4 h-5 w-5" />
              My Profile
            </Dropdown.Item>
          </Link>
          <Dropdown.Divider />
          <Dropdown.Item
            className="flex item-center px-2 py-4"
            onClick={handleSignout}
          >
            <LuLogOut className="mx-4 h-5 w-5" />
            Sign out
          </Dropdown.Item>
        </>
      )}
    </Dropdown>
  );
};

export default NavbarHeader;
