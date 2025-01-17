import React from "react";
import { Link } from "react-router-dom";

const AdSection = () => {
  return (
    <section className="py-16 md:py-24 bg-[#E5E5E3]">
      <div className="max-w-[2560px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* First Ad */}
          <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-2xl group">
            <img
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3"
              alt="Summer Sale"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <span className="inline-block px-4 py-1 mb-4 bg-white text-gray-900 text-sm font-medium rounded-full">
                  Limited Time Offer
                </span>
                <h3 className="text-3xl md:text-4xl font-light text-white mb-4">
                  Summer Sale
                </h3>
                <p className="text-white/80 mb-6 max-w-md">
                  Up to 50% off on selected items. Don't miss out on our biggest
                  sale of the season.
                </p>
                <Link
                  to="/products"
                  className="inline-block bg-white text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>

          {/* Second Ad - Vertical Stack */}
          <div className="space-y-8">
            {/* Top Ad */}
            <div className="relative h-[230px] md:h-[235px] overflow-hidden rounded-2xl group">
              <img
                src="https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?ixlib=rb-4.0.3"
                alt="New Collection"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full px-4">
                  <h3 className="text-2xl md:text-3xl font-light text-white mb-4">
                    New Collection
                  </h3>
                  <Link
                    to="/products"
                    className="inline-flex items-center text-white hover:text-gray-200 transition-colors"
                  >
                    <span className="mr-2">Discover More</span>
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
            </div>

            {/* Bottom Ad */}
            <div className="relative h-[230px] md:h-[235px] overflow-hidden rounded-2xl group">
              <img
                src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3"
                alt="Exclusive Designs"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full px-4">
                  <h3 className="text-2xl md:text-3xl font-light text-white mb-4">
                    Exclusive Designs
                  </h3>
                  <Link
                    to="/products"
                    className="inline-flex items-center text-white hover:text-gray-200 transition-colors"
                  >
                    <span className="mr-2">View Collection</span>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdSection;
