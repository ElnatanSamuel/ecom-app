import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCartAsync } from "../redux/slices/cartSlice";
import { getFeaturedProducts } from "../services/api";

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const data = await getFeaturedProducts();
        setFeaturedProducts(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-[2560px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Featured Products
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {featuredProducts.map((product) => (
            <div key={product._id} className="group">
              <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100">
                <img
                  src={
                    product.images.find((img) => img.isThumbnail)?.url ||
                    product.images[0]?.url
                  }
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:opacity-75"
                />
                <Link
                  to={`/product/${product._id}`}
                  className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300"
                />
              </div>
              <div className="mt-4 space-y-1">
                <h3 className="text-sm font-medium text-gray-900 truncate">
                  <Link to={`/product/${product._id}`}>{product.name}</Link>
                </h3>
                <p className="text-sm text-gray-500">{product.category}</p>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">
                    ${product.price.toFixed(2)}
                  </p>
                  <button
                    onClick={() => dispatch(addToCartAsync(product))}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
