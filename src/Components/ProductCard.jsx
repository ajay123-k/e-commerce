import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div>
      {/* Single Product card  */}
      <div className="shadow-lg bg-white  p-4 rounded-lg flex flex-col justify-between h-full">
        <Link to={`/product/${product.id}`} className="block">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-40 object-cover rounded-md"
          />
        </Link>
        <div className="mt-3 flex-grow">
          <h4 className="font-bold text-lg line-clamp-2 h-14">
            {product.title}
          </h4>
          <p className="text-blue-600 font-semibold">${product.price}</p>
        </div>
        <Link
          to={`/product/${product.id}`}
          className="mt-3 bg-black text-white py-2 px-4 rounded text-center w-full"
        >
          View Details
        </Link>
      </div>
      {/* Single Product card  */}
    </div>
  );
};

export default ProductCard;
