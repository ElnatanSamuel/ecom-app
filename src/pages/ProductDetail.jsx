import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCartAsync } from "../redux/slices/cartSlice";
import { getProductById } from "../services/api";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getProductById(id);
        if (!data) {
          throw new Error("Product not found");
        }
        setProduct(data);
      } catch (error) {
        console.error("Error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">
          {error || "Product not found"}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white mt-20">
      <div className="max-w-[2560px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-w-1 aspect-h-1 rounded-xl overflow-hidden bg-gray-50">
              <img
                src={product.images[activeImage]?.url}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`aspect-w-1 aspect-h-1 rounded-lg overflow-hidden ${
                    activeImage === index ? "ring-2 ring-gray-900" : ""
                  }`}
                >
                  <img
                    src={image.url}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover object-center"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <p className="text-gray-500 mb-2">{product.category}</p>
              <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                {product.name}
              </h1>
              <p className="text-2xl font-medium text-gray-900">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-gray-600">{product.description}</p>
              <ul className="space-y-2">
                {product.details.map((detail, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <span className="mr-2">•</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => {
                dispatch(addToCartAsync(product))
                  .unwrap()
                  .catch((error) => {
                    // Handle error (e.g., show toast notification)
                    console.error("Failed to add to cart:", error);
                  });
              }}
              disabled={loading}
              className="w-full bg-gray-900 text-white py-4 rounded-xl hover:bg-gray-800 transition-colors duration-300 disabled:bg-gray-400"
            >
              {loading ? "Adding..." : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
