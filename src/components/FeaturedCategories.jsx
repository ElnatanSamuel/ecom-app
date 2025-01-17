import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProducts } from "../services/api";

const FeaturedCategories = () => {
  const [styleCounts, setStyleCounts] = useState({
    Modern: 0,
    Scandinavian: 0,
    Contemporary: 0,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStyleCounts = async () => {
      try {
        const products = await getProducts();
        const counts = {
          Modern: products.filter((p) => p.style === "Modern").length,
          Scandinavian: products.filter((p) => p.style === "Scandinavian")
            .length,
          Contemporary: products.filter((p) => p.style === "Contemporary")
            .length,
        };
        setStyleCounts(counts);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchStyleCounts();
  }, []);

  const handleStyleClick = (styleName) => {
    navigate(`/products?style=${encodeURIComponent(styleName)}`);
  };

  const categories = [
    {
      name: "Modern",
      image:
        "https://images.unsplash.com/photo-1615529182904-14819c35db37?ixlib=rb-4.0.3",
      description: "Clean lines and functional aesthetics",
      count: `${styleCounts.Modern} items`,
    },
    {
      name: "Scandinavian",
      image:
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3",
      description: "Simple, beautiful, and functional designs",
      count: `${styleCounts.Scandinavian} items`,
    },
    {
      name: "Contemporary",
      image:
        "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?ixlib=rb-4.0.3",
      description: "Current trends and innovative styles",
      count: `${styleCounts.Contemporary} items`,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#E5E5E3]">
      <div className="max-w-[2560px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl 2xl:text-5xl font-light text-gray-900 mb-4">
            Shop by Style
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Discover furniture that matches your unique aesthetic preferences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {categories.map((category) => (
            <div
              key={category.name}
              onClick={() => handleStyleClick(category.name)}
              className="group cursor-pointer"
            >
              <div className="relative h-[300px] md:h-[400px] overflow-hidden rounded-2xl">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <span className="inline-block px-3 py-1 mb-3 bg-white/90 text-gray-900 text-xs font-medium rounded-full">
                      {category.count}
                    </span>
                    <h3 className="text-xl md:text-2xl font-light text-white mb-2">
                      {category.name}
                    </h3>
                    <p className="text-white/80 text-sm">
                      {category.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 md:mt-16">
          <Link
            to="/categories"
            className="inline-flex items-center space-x-2 text-gray-900 hover:text-gray-600 transition-colors"
          >
            <span className="text-sm md:text-base">View All Styles</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
