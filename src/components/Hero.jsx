import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "The Winter Sale",
      description:
        "Integer eget at augue suspendisse in vitae enim habitant. At donec pretium ultrices ac luctus vitae nihl erat.",
      image:
        "https://www.orangetree.in/cdn/shop/files/Gallery-1ChiyoL-ShapedSofaBuyOnline.jpg?v=1722852692",
      thumbnail:
        "https://www.orangetree.in/cdn/shop/files/Gallery-1ChiyoL-ShapedSofaBuyOnline.jpg?v=1722852692",
    },
    {
      title: "Modern Collection",
      description: "Discover our latest modern furniture collection.",
      image:
        "https://images-cdn.ubuy.ae/64d351023a9704015a2fd568-king-size-bedroom-furniture-set-5.jpg",
      thumbnail:
        "https://images-cdn.ubuy.ae/64d351023a9704015a2fd568-king-size-bedroom-furniture-set-5.jpg",
    },
    {
      title: "Minimalist Design",
      description: "Experience the beauty of minimalist furniture.",
      image:
        "https://www.urbanconcepts.ph/wp/wp-content/uploads/2024/07/Top-7-Sustainable-Furniture-Materials-for-Your-Home.jpg",
      thumbnail:
        "https://www.urbanconcepts.ph/wp/wp-content/uploads/2024/07/Top-7-Sustainable-Furniture-Materials-for-Your-Home.jpg",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[70vh] md:h-[85vh] lg:h-[100vh] bg-[#E5E5E3]">
      <div className="absolute inset-0">
        <img
          src={slides[currentSlide].image}
          alt={slides[currentSlide].title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Bottom Content Container */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent">
        <div className="max-w-[2560px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 2xl:px-24 pb-8 sm:pb-10 md:pb-12 lg:pb-16 2xl:pb-24 pt-32 sm:pt-36 md:pt-40 lg:pt-48 2xl:pt-64">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 md:gap-8 2xl:gap-12">
            {/* Text Content */}
            <div className="max-w-xl 2xl:max-w-3xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-light text-white mb-3 md:mb-4 2xl:mb-6">
                {slides[currentSlide].title}
              </h1>
              <p className="text-white/80 mb-4 md:mb-5 lg:mb-6 2xl:mb-8 text-sm md:text-base lg:text-lg 2xl:text-xl max-w-md 2xl:max-w-xl">
                {slides[currentSlide].description}
              </p>
              <button
                onClick={() => navigate("/products")}
                className="mt-8 bg-white text-gray-900 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Shop Now
              </button>
            </div>

            {/* Thumbnail Navigation */}
            <div className="flex gap-2 md:gap-3 2xl:gap-4 overflow-x-auto md:overflow-visible pb-2 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
              {slides.map((slide, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`flex-shrink-0 overflow-hidden transition-all duration-300 ${
                    currentSlide === index
                      ? "w-28 sm:w-32 md:w-40 2xl:w-56 h-16 sm:h-20 md:h-24 2xl:h-32 opacity-100"
                      : "w-14 sm:w-16 md:w-20 2xl:w-28 h-16 sm:h-20 md:h-24 2xl:h-32 opacity-50 hover:opacity-75"
                  }`}
                >
                  <img
                    src={slide.thumbnail}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
