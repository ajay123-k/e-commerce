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
        {products.length > 0 ? (
          <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
            {products.map((product, index) => (
              <ProductCard product={product} key={index} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-10 text-lg">
            Products Loading..
          </p>
        )}
        {/* All Products Section */}
      </div>
      <Footer />
    </>
  );
};

export default Shop;
