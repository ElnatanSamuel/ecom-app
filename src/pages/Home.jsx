import React from "react";
import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";
import Collections from "../components/Collections";
import AdSection from "../components/AdSection";
import Newsletter from "../components/Newsletter";
import FeaturedCategories from "../components/FeaturedCategories";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedProducts />
      <AdSection />
      <Collections />
      <FeaturedCategories />
      <Newsletter />
    </div>
  );
};

export default Home;
