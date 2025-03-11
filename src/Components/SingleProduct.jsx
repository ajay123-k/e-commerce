import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../Context/Product";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import Navbar from "./Navbar";
import { UserCartContext } from "../Context/Cart";
import { Footer } from "./Footer";

const SingleProduct = () => {
  const { contextProduct } = useContext(ProductContext);
  const { id } = useParams(); // Get product ID from URL params
  const { setCart } = useContext(UserCartContext);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "MyShop | Product Details";
  }, [contextProduct]);
  const product = contextProduct.find((p) => p.id.toString() === id);
  const relatedProducts = contextProduct
    .filter(
      (p) => p.category.name === product.category.name && p.id !== product.id
    )
    .slice(0, 4);
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);
  const totalPrice = (product?.price * quantity).toFixed(2);

  // Function to handle add to cart
  const addToCart = (product, quantity, totalPrice) => {
    let cartItem = {
      id: product.id,
      image: product.images[0],
      title: product.title,
      quantity,
      price: totalPrice,
    };
    setCart((prev) => [...prev, cartItem]);
    navigate("/cart");
  };

  return (
    <>
      <Navbar />
      {contextProduct.length === 0 ? (
        <p className="text-gray-500 text-center mt-10 py-10 text-lg">
          No Such product found. Go to{" "}
          <Link className="text-blue-500" to={"/"}>
            Home
          </Link>
        </p>
      ) : (
        <>
          {" "}
          <div>
            <div className="w-full mx-auto px-5 py-10">
              {/* Breadcrumb */}
              <div className="text-sm text-gray-600 mb-5">
                <nav className="flex items-center space-x-2">
                  <Link to="/" className="hover:underline text-blue-600">
                    Home
                  </Link>
                  <span>/</span>
                  <Link
                    to={`/category/${product?.category?.name}`}
                    className="hover:underline text-blue-600"
                  >
                    {product?.category?.name}
                  </Link>
                  <span>/</span>
                  <span className="font-semibold text-gray-900">
                    {product?.title}
                  </span>
                </nav>
              </div>
              {/* Breadcrumb */}

              {/* Single Product Section */}

              <div className="grid md:grid-cols-2 gap-10">
                {/* Product Image */}
                <div className="bg-gray-100 p-5 rounded-lg">
                  <img
                    src={product?.images[0]}
                    alt={product?.title}
                    className="w-full h-96 object-cover rounded-lg"
                  />
                </div>

                <div className="flex flex-col justify-between">
                  <div>
                    <h2 className="text-3xl font-bold">{product?.title}</h2>
                    <p className="text-gray-600 mt-2">
                      {product?.category?.name}
                    </p>
                    <h3 className="text-2xl font-semibold text-blue-600 mt-3">
                      ${totalPrice}
                    </h3>
                    <p className="text-gray-700 mt-4">{product?.description}</p>
                  </div>

                  {/* Quantity Selector */}
                  <div className="flex items-center gap-4 ">
                    <button
                      className="bg-gray-300 text-black px-4 py-2 rounded-lg text-lg font-bold cursor-pointer"
                      onClick={decreaseQuantity}
                      disabled={quantity === 1}
                    >
                      -
                    </button>
                    <span className="text-lg font-bold">{quantity}</span>
                    <button
                      className="bg-gray-300 text-black px-4 py-2 rounded-lg text-lg font-bold cursor-pointer"
                      onClick={increaseQuantity}
                    >
                      +
                    </button>
                  </div>

                  <div className="mt-6 flex gap-4">
                    <button
                      className=" bg-black text-white px-6 py-3 rounded text-lg cursor-pointer"
                      onClick={() => addToCart(product, quantity, totalPrice)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
              {/* Single Product Section */}
            </div>
          </div>
          {/* Related Product Section */}
          <div className="my-4 max-w-full px-4 py-10 ">
            <h3 className="text-3xl">Related Products :</h3>
            {relatedProducts.length > 0 ? (
              <div className="grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-2 gap-6">
                {relatedProducts.map((related, index) => (
                  <ProductCard product={related} key={index} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No related products found.</p>
            )}
          </div>
          {/* Related Product Section */}
        </>
      )}

      <Footer />
    </>
  );
};

export default SingleProduct;
