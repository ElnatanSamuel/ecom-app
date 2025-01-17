import React from "react";

const OurStory = () => {
  const milestones = [
    {
      year: "2010",
      title: "The Beginning",
      description:
        "Started as a small workshop in Brooklyn, crafting bespoke furniture pieces for local design enthusiasts.",
    },
    {
      year: "2015",
      title: "Expansion",
      description:
        "Opened our flagship store in Manhattan, bringing our unique design philosophy to a wider audience.",
    },
    {
      year: "2020",
      title: "Going Digital",
      description:
        "Launched our online platform, making our curated collections accessible nationwide while maintaining our commitment to quality.",
    },
  ];

  const values = [
    {
      icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5z",
      title: "Sustainable Materials",
      description:
        "Every piece is crafted using responsibly sourced materials, ensuring both quality and environmental consciousness.",
    },
    {
      icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
      title: "Artisanal Craftsmanship",
      description:
        "Our skilled artisans blend traditional techniques with modern innovation.",
    },
    {
      icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
      title: "Timeless Design",
      description:
        "We create pieces that transcend trends, becoming lasting elements of your home.",
    },
  ];

  const team = [
    {
      name: "Sarah Chen",
      role: "Founder & Creative Director",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      description: "With over 15 years of experience in furniture design.",
    },
    {
      name: "Marcus Rodriguez",
      role: "Head of Design",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      description: "Bringing contemporary vision to traditional craftsmanship.",
    },
    {
      name: "Emma Thompson",
      role: "Sustainability Director",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      description:
        "Leading our eco-friendly initiatives and material sourcing.",
    },
  ];

  return (
    <div className="bg-white">
      {/* Enhanced Hero Section */}
      <section className="relative h-[60vh] bg-gray-900">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace"
            className="w-full h-full object-cover opacity-30"
            alt="Workshop"
          />
        </div>
        <div className="relative max-w-[2560px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-4xl mt-10">
            <h1 className="text-4xl md:text-5xl 2xl:text-6xl font-light text-white mb-6">
              Crafting More Than Furniture:
              <br />
              Building Living Spaces With Soul
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-3xl">
              Since 2010, we've been dedicated to the art of furniture making,
              combining traditional craftsmanship with contemporary design.
              Every piece tells a story of dedication, innovation, and
              sustainable practices.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section - Kept as is */}
      <section className="py-16 md:py-24">
        <div className="max-w-[2560px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-light text-center mb-16">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d={value.icon}
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Redesigned Journey Section */}
      <section className="py-16 md:py-24 bg-[#E5E5E3]">
        <div className="max-w-[2560px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl 2xl:text-5xl font-light text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
              From humble beginnings to becoming a leading name in furniture
              design
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {milestones.map((milestone, index) => (
              <div
                key={milestone.year}
                className="group bg-white rounded-xl p-8 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-2 h-full bg-gray-900 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                <span className="text-3xl font-light text-gray-900 mb-4 block">
                  {milestone.year}
                </span>
                <h3 className="text-xl font-medium mb-4">{milestone.title}</h3>
                <p className="text-gray-600">{milestone.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Adjusted Craftsmanship Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-[2560px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="h-[400px] md:h-[500px] rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1581428982868-e410dd047a90"
                alt="Craftsmanship"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-light text-gray-900">
                Dedication to Craftsmanship
              </h2>
              <p className="text-gray-600">
                Every piece we create is a testament to our commitment to
                quality and attention to detail. Our artisans combine
                traditional woodworking techniques with modern precision to
                create furniture that lasts generations.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div>
                  <h4 className="text-2xl font-light text-gray-900 mb-2">
                    1000+
                  </h4>
                  <p className="text-gray-600">Pieces Crafted</p>
                </div>
                <div>
                  <h4 className="text-2xl font-light text-gray-900 mb-2">
                    100%
                  </h4>
                  <p className="text-gray-600">Sustainable Materials</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Design Philosophy Section */}
      <section className="py-16 md:py-24 bg-[#E5E5E3]">
        <div className="max-w-[2560px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl 2xl:text-5xl font-light text-gray-900 mb-4">
              Our Design Philosophy
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
              Where tradition meets innovation in every piece we create
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl">
              <h3 className="text-xl font-medium mb-4">
                Form Follows Function
              </h3>
              <p className="text-gray-600">
                Every design decision is made with purpose, ensuring both beauty
                and utility in each piece.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl">
              <h3 className="text-xl font-medium mb-4">
                Sustainable Innovation
              </h3>
              <p className="text-gray-600">
                We embrace new technologies while maintaining our commitment to
                environmental responsibility.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl">
              <h3 className="text-xl font-medium mb-4">Timeless Appeal</h3>
              <p className="text-gray-600">
                Our designs transcend trends, creating pieces that remain
                relevant and beautiful for generations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurStory;
