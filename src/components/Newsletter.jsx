import React, { useEffect, useRef } from "react";

const Newsletter = () => {
  const parallaxRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return;

      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.3;

      parallaxRef.current.style.transform = `translate3d(0, ${rate}px, 0)`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div
          ref={parallaxRef}
          className="absolute inset-0 h-[130%] will-change-transform"
          style={{ transform: "translate3d(0, 0, 0)" }}
        >
          <img
            src="https://uni-user.s3.amazonaws.com/un/unisupport2/unisupport22022-02-02T07-22-53-803660.jpg"
            alt="Background"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/60 to-[#1a1a1a]" />
      </div>

      <div className="relative max-w-[2560px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl 2xl:text-5xl font-light text-white mb-4">
            Join Our Newsletter
          </h2>
          <p className="text-white/80 mb-8 text-sm md:text-base max-w-md mx-auto">
            Subscribe to receive updates, access to exclusive deals, and more.
          </p>

          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-white/40 transition-colors"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
