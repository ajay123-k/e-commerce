import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../Context/Product";
import axios from "axios";
import ProductCard from "./ProductCard";
import Navbar from "./Navbar";
import { Footer } from "./Footer";

const Home = () => {
  const [products, setProducts] = useState([]);
  const { contextProduct, setContextProduct } = useContext(ProductContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "MyShop | Home";
    if (contextProduct.length > 0) {
      setProducts(contextProduct);
    } else {
      setLoading(true);
      axios
        .get(import.meta.env.VITE_API_URL)
        .then((res) => {
          setLoading(false);
          setProducts(res.data.slice(0, 32));
          setContextProduct(res.data.slice(0, 32));
        })
        .catch((e) => setLoading(false));
    }
  }, [products]);

  const uniqueCategories = [
    ...new Set(contextProduct.map((product) => product.category.name)),
  ];

  return (
    <>
      <Navbar />
      <div>
        {/* Hero Section */}

        <div className="relative w-full h-[500px] bg-cover bg-center flex items-center justify-center text-white">
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative text-center max-w-2xl p-6">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Discover the Best <span className="text-yellow-400">Deals</span>{" "}
              Online
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-200">
              Shop the latest trends and get exclusive discounts on your
              favorite products.
            </p>
            <div className="mt-6 flex gap-4 justify-center">
              <Link
                to="/products"
                className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
        {/* Hero Section */}

        {loading ? (
          <p className="text-gray-500 text-center mt-10 text-lg">
            Products Loading..
          </p>
        ) : (
          <>
            {/* Category Section */}

            <div className="py-12 px-6">
              <h2 className="text-3xl font-bold text-center mb-8">
                Shop by Categories
              </h2>

              <div className="flex flex-wrap justify-center gap-6">
                {uniqueCategories.slice(0, 4).map((category, index) => {
                  return (
                    <Link
                      to={`/category/${category}`}
                      key={index}
                      className="flex items-center bg-white rounded-lg shadow-md overflow-hidden w-full md:max-w-[48%] lg:max-w-[40%] hover:shadow-lg transition duration-300"
                    >
                      {/* Category Image */}
                      <img
                        src="/new-products.png"
                        alt={category.name}
                        className="w-36 h-36 object-cover transition-transform duration-300 hover:scale-105"
                      />

                      {/* Category Info */}
                      <div className="p-5 flex-1">
                        <h3 className="text-xl font-semibold capitalize">
                          {category}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">
                          Explore the {category.toLowerCase()} products.
                        </p>
                        <button className="mt-3 bg-black text-white py-2 px-4 rounded text-sm hover:bg-gray-800">
                          Shop Now
                        </button>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
            {/* Category Section */}

            {/* Best-Selling Section */}
            <section className="py-10 px-6">
              <h2 className="text-3xl font-bold text-center mb-6">
                Best Sellers
              </h2>
              <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
                {contextProduct.slice(0, 4).map((product) => (
                  <ProductCard product={product} key={product.id} />
                ))}
              </div>
            </section>
            {/* Best-Selling Section */}

            {/* New Arrivals Section */}
            <section className="py-10 px-6">
              <h2 className="text-3xl font-bold text-center mb-6">
                New Arrivals
              </h2>
              <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
                {contextProduct.slice(-4).map((product) => (
                  <ProductCard product={product} key={product.id} />
                ))}
              </div>
            </section>
            {/* New Arrivals Section */}
          </>
        )}

        <Footer />
      </div>
    </>
  );
};

export default Home;
