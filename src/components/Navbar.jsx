import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);

  const productCategories = [
    { name: "All Products", href: "/products", filter: "" },
    { name: "Living Room", href: "/products", filter: "Living Room" },
    { name: "Bedroom", href: "/products", filter: "Bedroom" },
    { name: "Dining", href: "/products", filter: "Dining" },
    { name: "Office", href: "/products", filter: "Office" },
  ];

  const navigate = useNavigate();
  const location = useLocation();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".nav-dropdown")) {
        setIsProductDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Close dropdown when route changes
  useEffect(() => {
    setIsProductDropdownOpen(false);
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleCategoryClick = (filter) => {
    if (filter === "") {
      navigate("/products");
    } else {
      navigate(`/products?category=${filter}`);
    }
    setIsProductDropdownOpen(false);
  };

  return (
    <nav className="absolute top-6 left-4 right-4 z-50">
      <div className="max-w-[2560px] mx-auto">
        <div className="flex items-center h-16 md:h-20 2xl:h-24 bg-white rounded-lg px-4 md:px-12 2xl:px-24">
          {/* Mobile & Tablet Menu Button */}
          <div className="lg:hidden">
            <button
              className="text-gray-800 p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8 2xl:space-x-12 flex-1">
            <Link
              to="/"
              className="text-gray-800 text-sm 2xl:text-base hover:text-gray-600"
            >
              Home
            </Link>
            <div className="relative group">
              <button
                className="text-gray-800 text-sm 2xl:text-base hover:text-gray-600 flex items-center"
                onClick={() => setIsProductDropdownOpen(!isProductDropdownOpen)}
              >
                Products <span className="ml-1">↓</span>
              </button>

              {/* Products Dropdown */}
              <div
                className={`absolute left-0 mt-4 w-56 bg-white rounded-lg shadow-lg transition-all duration-200 z-50 ${
                  isProductDropdownOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2"
                }`}
              >
                <div className="py-3">
                  {productCategories.map((category) => (
                    <button
                      key={category.name}
                      onClick={() => handleCategoryClick(category.filter)}
                      className="block w-full text-left px-6 py-4 text-sm text-gray-800 hover:bg-gray-50 transition-colors duration-150"
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <Link
              to="/our-story"
              className="text-gray-800 text-sm 2xl:text-base hover:text-gray-600"
            >
              Our Story
            </Link>
            <Link
              to="/contact"
              className="text-gray-800 text-sm 2xl:text-base hover:text-gray-600"
            >
              Contact Us
            </Link>
          </div>

          {/* Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link
              to="/"
              className="text-xl md:text-2xl 2xl:text-3xl font-serif text-gray-900"
            >
              Nest & Noir
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4 md:space-x-8 flex-1 justify-end">
            <div className="hidden lg:block relative group">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Search"
                  className="bg-transparent text-sm 2xl:text-base w-48 2xl:w-64 border-b border-gray-300 focus:border-gray-900 focus:outline-none px-4 py-1.5 transition-all duration-200 placeholder-gray-400"
                />
                <svg
                  className="w-4 h-4 2xl:w-5 2xl:h-5 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-gray-600 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
            <Link
              to="/cart"
              className="text-gray-800 hover:text-gray-600 transition-colors duration-200"
            >
              <svg
                className="w-5 h-5 2xl:w-6 2xl:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Mobile & Tablet Menu */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden bg-white mt-2 rounded-lg`}
        >
          <div className="px-4 py-2 space-y-2">
            <Link
              to="/"
              className="block py-2 text-gray-800 hover:text-gray-600"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="block py-2 text-gray-800 hover:text-gray-600"
            >
              Products
            </Link>
            <Link
              to="/our-story"
              className="block py-2 text-gray-800 hover:text-gray-600"
            >
              Our Story
            </Link>
            <Link
              to="/contact"
              className="block py-2 text-gray-800 hover:text-gray-600"
            >
              Contact Us
            </Link>
            <div className="relative py-2">
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-gray-50 rounded-lg px-4 py-2 text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
