import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setFilter } from "../redux/slices/filterSlice";
import { getProducts } from "../services/api";

const Collections = () => {
  const [collections, setCollections] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const products = await getProducts();
        const uniqueCategories = [...new Set(products.map((p) => p.category))];

        const collectionsData = uniqueCategories.map((category) => {
          const categoryProducts = products.filter(
            (p) => p.category === category
          );
          const firstProduct = categoryProducts[0];
          return {
            name: category,
            image:
              firstProduct?.images.find((img) => img.isThumbnail)?.url ||
              firstProduct?.images[0]?.url,
            description: `Explore our ${category.toLowerCase()} collection`,
            items: `${categoryProducts.length} items`,
          };
        });

        // Only show collections that have products
        const nonEmptyCollections = collectionsData.filter(
          (collection) => collection.image
        );
        setCollections(nonEmptyCollections);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchCollections();
  }, []);

  const handleCollectionClick = (collectionName) => {
    const categoryMap = {
      "Living Room": "Living Room",
      Bedroom: "Bedroom",
      Dining: "Dining",
      Office: "Office",
      Outdoor: "Outdoor",
    };

    dispatch(
      setFilter({ type: "category", value: categoryMap[collectionName] })
    );
    navigate(
      `/products?category=${encodeURIComponent(categoryMap[collectionName])}`
    );
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-[2560px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl 2xl:text-5xl font-light text-gray-900 mb-4">
            Our Collections
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Explore our carefully curated collections, each designed to bring
            harmony and style to your space
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {collections.map((collection) => (
            <div
              key={collection.name}
              onClick={() => handleCollectionClick(collection.name)}
              className="group cursor-pointer"
            >
              <div className="relative h-[400px] md:h-[500px] lg:h-[400px] overflow-hidden rounded-2xl">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="h-full w-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <span className="inline-block px-3 py-1 mb-3 bg-white/90 text-gray-900 text-xs font-medium rounded-full">
                      {collection.items}
                    </span>
                    <h3 className="text-xl md:text-2xl font-light text-white mb-2">
                      {collection.name}
                    </h3>
                    <p className="text-white/80 text-sm">
                      {collection.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 md:mt-16">
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 text-gray-900 hover:text-gray-600 transition-colors"
          >
            <span className="text-sm md:text-base">View All Collections</span>
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

export default Collections;
