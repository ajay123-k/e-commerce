import { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { ProductContext } from "../Context/Product";
import ProductCard from "./ProductCard";
import Navbar from "./Navbar";
import { Footer } from "./Footer";

const CategoryProducts = () => {
  const { contextProduct } = useContext(ProductContext);
  const { categoryName } = useParams();
  const filteredProducts = contextProduct.filter(
    (product) =>
      product.category.name.toLowerCase() === categoryName.toLowerCase()
  );

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
            <span className="font-semibold text-gray-900">{categoryName}</span>
          </nav>
        </div>

        {/* Category Header */}
        <h2 className="text-3xl font-bold mb-6 capitalize">{categoryName}</h2>

        {/* Category Products Section */}

        {filteredProducts.length > 0 ? (
          <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-10 text-lg py-10">
            No products found in this category. Go to{" "}
            <Link className="text-blue-500" to={"/"}>
              Home
            </Link>
          </p>
        )}
      </div>
      {/* Category Products Section */}
      <Footer />
    </>
  );
};

export default CategoryProducts;
