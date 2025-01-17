import React, { useState, useEffect } from "react";
import {
  useLocation,
  useNavigate,
  Link,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAsync } from "../redux/slices/cartSlice";
import { setFilter } from "../redux/slices/filterSlice";
import { getProducts } from "../services/api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [openAccordion, setOpenAccordion] = useState(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const style = searchParams.get("style");
  const filters = useSelector((state) => state.filter);

  // Categories, price ranges, and styles from your existing code
  const categories = ["Living Room", "Bedroom", "Dining", "Office", "Outdoor"];
  const priceRanges = [
    { label: "Under $500", value: "0-500" },
    { label: "$500 - $1000", value: "500-1000" },
    { label: "$1000 - $2000", value: "1000-2000" },
    { label: "Over $2000", value: "2000+" },
  ];
  const styles = [
    "Modern",
    "Contemporary",
    "Traditional",
    "Scandinavian",
    "Industrial",
  ];

  // Check for category from URL params on component mount
  useEffect(() => {
    const category = queryParams.get("category");
    if (category) {
      dispatch(setFilter({ type: "category", value: category }));
    }
  }, [location.search]); // React to URL changes

  // Apply filters
  useEffect(() => {
    let result = [...products];

    if (filters.category) {
      result = result.filter(
        (product) => product.category === filters.category
      );
    }

    if (filters.style) {
      result = result.filter((product) => product.style === filters.style);
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split("-").map(Number);
      result = result.filter((product) => {
        if (max) {
          return product.price >= min && product.price <= max;
        } else {
          return product.price >= min;
        }
      });
    }

    // Apply sorting
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(result);
  }, [filters, sortBy, products]);

  const handleFilterChange = (type, value) => {
    // If clicking the same filter, clear it
    if (filters[type] === value) {
      dispatch(setFilter({ type, value: "" }));
      navigate("/products");
      return;
    }

    // Otherwise, set the new filter
    dispatch(setFilter({ type, value }));

    if (type === "category") {
      navigate(`/products?category=${encodeURIComponent(value)}`);
    } else if (type === "style") {
      navigate(`/products?style=${encodeURIComponent(value)}`);
    }
  };

  const getFilterButtonClass = (type, value) => {
    const isActive = filters[type] === value;
    return `block w-full text-left px-3 py-2 rounded transition-colors duration-200 ${
      isActive
        ? "bg-gray-900 text-white hover:bg-gray-800"
        : "text-gray-800 hover:bg-gray-100"
    }`;
  };

  const toggleAccordion = (section) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  useEffect(() => {
    if (category) {
      dispatch(setFilter({ type: "category", value: category }));
    }
    if (style) {
      dispatch(setFilter({ type: "style", value: style }));
    }
  }, [category, style]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts(filters);
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="bg-white mt-20">
      <div className="max-w-[2560px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-light text-gray-900 mb-4 md:mb-0">
            All Products
          </h1>
          <div className="flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border rounded-lg px-4 py-2 text-sm"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filters */}
          <div className="lg:hidden grid grid-cols-2 gap-4 mb-8">
            {/* Categories Accordion */}
            <div className="border rounded-lg">
              <button
                onClick={() => toggleAccordion("categories")}
                className="w-full px-4 py-3 flex justify-between items-center"
              >
                <span className="font-medium">Categories</span>
                <svg
                  className={`w-5 h-5 transition-transform ${
                    openAccordion === "categories" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className={`${
                  openAccordion === "categories" ? "block" : "hidden"
                } px-4 pb-4`}
              >
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleFilterChange("category", category)}
                    className={getFilterButtonClass("category", category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Accordion */}
            <div className="border rounded-lg">
              <button
                onClick={() => toggleAccordion("price")}
                className="w-full px-4 py-3 flex justify-between items-center"
              >
                <span className="font-medium">Price</span>
                <svg
                  className={`w-5 h-5 transition-transform ${
                    openAccordion === "price" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className={`${
                  openAccordion === "price" ? "block" : "hidden"
                } px-4 pb-4`}
              >
                {priceRanges.map((range) => (
                  <button
                    key={range.value}
                    onClick={() =>
                      handleFilterChange("priceRange", range.value)
                    }
                    className={getFilterButtonClass("priceRange", range.value)}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Style Accordion */}
            <div className="border rounded-lg">
              <button
                onClick={() => toggleAccordion("style")}
                className="w-full px-4 py-3 flex justify-between items-center"
              >
                <span className="font-medium">Style</span>
                <svg
                  className={`w-5 h-5 transition-transform ${
                    openAccordion === "style" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className={`${
                  openAccordion === "style" ? "block" : "hidden"
                } px-4 pb-4`}
              >
                {styles.map((style) => (
                  <button
                    key={style}
                    onClick={() => handleFilterChange("style", style)}
                    className={getFilterButtonClass("style", style)}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Filters */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-8 space-y-8">
              {/* Categories */}
              <div>
                <h3 className="text-lg font-medium mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleFilterChange("category", category)}
                      className={getFilterButtonClass("category", category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="text-lg font-medium mb-4">Price Range</h3>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <button
                      key={range.value}
                      onClick={() =>
                        handleFilterChange("priceRange", range.value)
                      }
                      className={getFilterButtonClass(
                        "priceRange",
                        range.value
                      )}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Style */}
              <div>
                <h3 className="text-lg font-medium mb-4">Style</h3>
                <div className="space-y-2">
                  {styles.map((style) => (
                    <button
                      key={style}
                      onClick={() => handleFilterChange("style", style)}
                      className={getFilterButtonClass("style", style)}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {filteredProducts.map((product) => (
                <div key={product._id} className="group relative">
                  <div className="aspect-square overflow-hidden rounded-xl bg-gray-100">
                    <Link to={`/product/${product._id}`}>
                      <img
                        src={
                          product.images.find((img) => img.isThumbnail)?.url ||
                          product.images[0]?.url
                        }
                        alt={product.name}
                        className="w-full h-full object-cover object-center group-hover:opacity-75"
                      />
                    </Link>
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
        </div>
      </div>
    </div>
  );
};

export default Products;
