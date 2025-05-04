import { HiOutlineShoppingBag } from "react-icons/hi2";
import { Dropdown, Navbar, Avatar, Button } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { FaTruck } from "react-icons/fa6";
import { LuLogOut, LuPackage, LuUser } from "react-icons/lu";
import { Link, NavLink, useNavigate } from "react-router-dom";
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
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState([]);
  const authId = currentUser?.user._id;

  const handleSignout = async () => {
    try {
      const data = await logoutUser();
      toast.success(data.message);
      dispatch(signoutSuccess());
      navigate("/login");
    } catch (error) {
      console.error(error); // this "uses" it
      toast.error("An unexpected error occurred");
    }
  };

  const fetchCart = async (authId) => {
    try {
      const response = await fetchUserCart(authId);
      if (!response.cart) {
        throw new Error("Failed to fetch cart data.");
      }
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
      if (!response.success) {
        throw new Error(response.message || "Failed to remove item from cart.");
      }
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

  return (
    <Navbar fluid className="border-b-2 shadow-lg">
      <div className="w-full lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <Navbar.Brand href="/" className="px-6">
            <span className="self-center whitespace-nowrap text-2xl font-semibold italic">
              Techstore <span className="text-red-500 italic">Shop.</span>
            </span>
          </Navbar.Brand>

          {/* Responsive links */}
          <div className="hidden md:flex items-center gap-6">
            <NavLinks />
          </div>

          <div className="flex items-center gap-4">
            <CartDropdown
              cartItems={cartItems}
              handleRemoveItem={handleRemoveItem}
            />
            <UserDropdown
              handleSignout={handleSignout}
              currentUser={currentUser}
            />
          </div>
        </div>
      </div>
    </Navbar>
  );
};

const NavLinks = () => {
  const baseStyle = "text-gray-600 transition-all duration-200";
  const hoverStyle = "hover:text-blue-500 hover:text-lg";
  const activeStyle = "text-blue-700 font-bold";

  return (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${baseStyle} ${hoverStyle} ${isActive ? activeStyle : ""}`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/products"
        className={({ isActive }) =>
          `${baseStyle} ${hoverStyle} ${isActive ? activeStyle : ""}`
        }
      >
        Products
      </NavLink>
      <NavLink
        to="/cart"
        className={({ isActive }) =>
          `${baseStyle} ${hoverStyle} ${isActive ? activeStyle : ""}`
        }
      >
        Cart
      </NavLink>
      <NavLink
        to="/contact"
        className={({ isActive }) =>
          `${baseStyle} ${hoverStyle} ${isActive ? activeStyle : ""}`
        }
      >
        Contact
      </NavLink>
    </>
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
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500 py-4">Your cart is empty.</p>
      ) : (
        cartItems.map((item, index) => {
          const product = item.productId;
          if (!product || !product.images || !product.name || !product.price)
            return null;

          return (
            <Dropdown.Item
              key={index}
              className="flex items-center justify-between border border-gray-200 bg-white shadow-md hover:bg-gray-50"
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-12 h-12 object-cover"
              />
              <div className="flex-1 mx-3 text-left">
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-gray-500">${product.price}</p>
              </div>
              <span
                onClick={() => handleRemoveItem(product._id)}
                className="text-red-500 hover:text-red-700 cursor-pointer"
              >
                <RiDeleteBack2Line className="text-xl" />
              </span>
            </Dropdown.Item>
          );
        })
      )}

      <Dropdown.Divider className="py-1" />

      <Dropdown.Header>
        <div className="flex justify-between">
          <Link to={"/cart"}>
            <Button color="gray" className="px-4">
              View Cart
            </Button>
          </Link>
          <Link to={"/product/checkout"}>
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
          <Avatar alt="User avatar" rounded size="sm" />
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
            <Link to={"/login"}>
              <Button color="gray">Sign in</Button>
            </Link>
            <Link to={"/register"}>
              <Button color="blue">Sign Up</Button>
            </Link>
          </div>
        )}
      </Dropdown.Header>

      <Link to={"/track-orders"}>
        <Dropdown.Item className="flex item-center px-2 py-4">
          <FaTruck className="mx-4 h-5 w-5" />
          Track your Order
        </Dropdown.Item>
      </Link>
      <Link to={"/my-orders"}>
        <Dropdown.Item className="flex item-center px-2 py-4">
          <LuPackage className="mx-4 h-5 w-5" />
          My Orders
        </Dropdown.Item>
      </Link>
      <Link to={"/user-profile"}>
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
    </Dropdown>
  );
};

export default NavbarHeader;
