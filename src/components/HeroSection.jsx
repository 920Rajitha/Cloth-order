import React from 'react';

const HeroSection = () => {
  return (
    <section className="h-[90vh] flex flex-col md:flex-row items-center justify-center px-10 pt-10 bg-gradient-to-r from-white to-gray-100">
    <div className="flex-1 max-w-[600px] md:mr-12 mb-8 md:mb-0">
      <img
        src="/gallery/main.jpg"
        alt="Hero"
        className="w-full h-auto object-contain rounded-xl shadow-xl"
      />
    </div>
  
    <div className="flex-1 text-center md:text-left space-y-6 animate-fade-in">
      <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
        Your Style, <span className="underline decoration-black">Redefined</span>
      </h1>
      <p className="text-gray-600 text-lg max-w-md">
        Premium fashion designed for you. Discover timeless fits and personalized looks.
      </p>
      <button className="px-6 py-3 bg-black text-white hover:bg-white hover:text-black border border-black transition-all">
        Shop Now
      </button>
    </div>
  </section>
  
  );
};

export default HeroSection;
