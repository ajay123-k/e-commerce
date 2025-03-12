import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../Context/Product";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import Navbar from "./Navbar";
import { Footer } from "./Footer";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const { contextProduct, setContextProduct } = useContext(ProductContext);
  const [value, setValue] = useState("");
  const [isSearched, setIsSearched] = useState(false);
  useEffect(() => {
    document.title = "MyShop | Products";
    if (contextProduct.length > 0) {
      setProducts(contextProduct);
      return;
    }
    axios.get(import.meta.env.VITE_API_URL).then((res) => {
      setProducts(res.data.slice(0, 32));
      setContextProduct(res.data.slice(0, 32));
    });
  }, []);

  const searchProduct = () => {
    if (!value.trim()) return;

    const filteredProducts = products.filter((p) =>
      p.title.toLowerCase().includes(value.toLowerCase())
    );
    setProducts(filteredProducts);
    setIsSearched(true);
  };

  const clearSearch = () => {
    setProducts(contextProduct);
    setValue("");
    setIsSearched(false);
  };
  return (
    <>
      <Navbar />
      <div className="p-6">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mb-5">
          <nav className="flex items-center space-x-2">
            <Link to="/" className="hover:underline text-blue-600">
              Home
            </Link>
            <span>/</span>
            <span className="font-semibold text-gray-900">All Products</span>
          </nav>
        </div>
        {/* Breadcrumb */}

        {/* All Products Section */}
        <h2 className="text-3xl font-bold mb-6 capitalize">All Products</h2>
        <div className="flex w-full justify-center lg:justify-end p-4">
          <div className="flex items-center space-x-2 bg-white p-2 rounded shadow-md">
            <input
              type="text"
              className="py-2 px-4 border border-gray-300 text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Search products..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />

            {!isSearched ? (
              <button
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition duration-200 cursor-pointer"
                onClick={searchProduct}
              >
                Search
              </button>
            ) : (
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200 cursor-pointer"
                onClick={clearSearch}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {products.length > 0 ? (
          <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
            {products.map((product, index) => (
              <ProductCard product={product} key={index} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-10 text-lg">
            {isSearched ? (
              <div className="flex flex-col items-center justify-center text-center p-8">
                <img
                  src="/empty-box.png"
                  alt="No products found"
                  className="w-40 h-40 object-contain"
                />
                <p className="text-gray-500 text-lg mt-4">
                  Oops! No products match your search. Try something else!
                </p>
              </div>
            ) : (
              " Products Loading.."
            )}
          </p>
        )}
        {/* All Products Section */}
      </div>
      <Footer />
    </>
  );
};

export default Shop;
