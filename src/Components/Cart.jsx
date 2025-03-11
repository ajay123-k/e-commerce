import { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { UserCartContext } from "../Context/Cart";
import { useNavigate } from "react-router-dom";
import { Footer } from "./Footer";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const { cart, setCart } = useContext(UserCartContext);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "MyShop | Cart";
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    localStorage.removeItem("isCheckoutCliked");
    setCartItems(storedCart);
  }, []);

  // Function to remove item from cart
  const removeItem = (id) => {
    let sure = window.confirm(
      "Are you sure you want to delete product from cart"
    );
    if (!sure) {
      return;
    }
    const filteredCart = cartItems.filter((item) => item.id !== id);
    setCartItems(filteredCart);
    setCart(filteredCart);
    return;
  };

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );

  // Function to handle checkout
  const handleCheckOut = () => {
    let user = localStorage.getItem("loggedInUser");
    if (!user) {
      alert("Please login for checkout");
      localStorage.setItem("isCheckoutCliked", "true");
      return;
    }
    alert("Your order has been confirmed");
    localStorage.removeItem("cart");
    setCart([]);
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-5">
        <h2 className="text-2xl font-bold mb-5">Shopping Cart</h2>
        {/* Cart Section */}
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
              alt="Empty Cart"
              className="w-32 h-32 opacity-50"
            />
            <h2 className="text-xl font-bold text-gray-700 mt-4">
              Your cart is empty!
            </h2>
            <p className="text-gray-500 mt-2">
              Looks like you haven't added anything to your cart yet.
            </p>
            <a
              href="/products"
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
            >
              Start Shopping
            </a>
          </div>
        ) : (
          <div className="grid gap-4">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-white p-4 rounded shadow-lg"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-cover"
                />

                <div className="flex-1 ml-4">
                  <h4 className="font-bold">{item.title}</h4>
                  <p className="text-gray-600">${Number(item.price)}</p>
                  <p className="text-gray-600">
                    Quantity {Number(item.quantity)}
                  </p>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 cursor-pointer"
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="text-right">
              <h3 className="text-xl font-bold">
                Total: ${totalPrice.toFixed(2)}
              </h3>
              <button
                className="mt-3 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
                onClick={handleCheckOut}
              >
                Checkout
              </button>
            </div>
          </div>
        )}
        {/* Cart Section */}
      </div>
    </>
  );
};

export default CartPage;
