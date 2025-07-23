import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('❌ Fetch error:', err));
  }, []);

  return (
    <section className="py-20 px-6 md:px-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold tracking-wide uppercase text-gray-800">Featured Collection</h2>
        <p className="text-gray-500 mt-2 text-sm">Our top picks this season, curated for style & comfort</p>
        <div className="mt-3 mx-auto h-1 w-24 bg-black rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {products.map((product) => (
          <motion.div
            key={product.id}
            whileHover={{ scale: 1.03 }}
            className="relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300"
          >
            {/* Product Image */}
            <div className="overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-72 object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Tag */}
            {product.tag && (
              <span className="absolute top-3 left-3 bg-black text-white text-[10px] px-3 py-[2px] rounded-full uppercase tracking-wide">
                {product.tag}
              </span>
            )}

            {/* Info Section */}
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-1">{product.name}</h3>
              <p className="text-gray-700 text-lg mb-4 font-medium">Rs. {parseInt(product.price).toLocaleString()}</p>

              {/* View Button */}
              <Link to={`/product/${product.id}`}>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  className="px-5 py-2 text-sm font-medium border border-black text-black rounded-full hover:bg-black hover:text-white transition"
                >
                  View Product
                </motion.button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
