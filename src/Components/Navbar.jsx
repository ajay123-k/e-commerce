import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // If using React Router
import { UserCartContext } from "../Context/Cart";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { cart } = useContext(UserCartContext);
  const [cartItems, setCartItems] = useState(cart);
  let localCart = JSON.parse(localStorage.getItem("cart"));

  useEffect(() => {
    setCartItems(localCart);
  }, [cart]);

  // Function to handle user logout
  const logout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("users");
    localStorage.removeItem("cart");
    setDropdownOpen(false);
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md relative">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          MyShop
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-gray-600">
            Home
          </Link>
          <Link to="/products" className="hover:text-gray-600">
            Products
          </Link>
          <Link to="/cart" className="relative hover:text-gray-600">
            Cart
            {localCart?.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {localCart.length}
              </span>
            )}
          </Link>

          {/* User Dropdown */}
          <div className="relative">
            {user ? (
              <>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center me-5  rounded  cursor-pointer"
                >
                  {user.name}
                </button>

                {dropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white text-black shadow-lg rounded z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-200"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <Link
                to="/login"
                className="bg-blue-500 px-4 py-2 rounded text-white"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-800 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✖" : "☰"} {/* Toggle Icon */}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-100">
          <Link to="/" className="block px-4 py-2 hover:bg-gray-200">
            Home
          </Link>
          <Link to="/products" className="block px-4 py-2 hover:bg-gray-200">
            Products
          </Link>
          <Link to="/cart" className="block px-4 py-2 hover:bg-gray-200">
            Cart
          </Link>

          {user ? (
            <>
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200">
                Profile
              </Link>
              <button
                onClick={logout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="block px-4 py-2 bg-blue-500 text-white text-center"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
