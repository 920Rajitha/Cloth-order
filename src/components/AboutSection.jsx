import React from 'react';

const AboutSection = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-20 flex flex-col md:flex-row items-center gap-12">
      <img src="/gallery/about.jpg" alt="About us" className="w-full md:w-1/2 rounded-xl shadow-xl" />
      <div className="text-center md:text-left">
        <h2 className="text-gray-800 text-3xl font-bold mb-4">About Dana Production</h2>
        <p className="text-gray-600 leading-loose max-w-lg">
          At Dana Production, we blend art and apparel to create stylish, comfortable, and sustainable clothing.
          Our mission is to provide a personal and elegant fashion experience made just for you.
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
