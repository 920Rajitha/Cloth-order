import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const products = [
  {
    id: 1,
    name: 'Oversized Tee',
    price: 'Rs. 3,500',
    image: '/gallery/product1.jpg',
  },
  {
    id: 2,
    name: 'Premium Hoodie',
    price: 'Rs. 5,200',
    image: '/gallery/product2.jpg',
  },
  {
    id: 3,
    name: 'Urban Jacket',
    price: 'Rs. 7,900',
    image: '/gallery/product3.jpg',
  },
  {
    id: 4,
    name: 'Minimal Cap',
    price: 'Rs. 1,500',
    image: '/gallery/product4.jpg',
  },
];

const Shop = () => {
  const { addToCart } = useCart();

  return (
    <section className="py-20 px-6 md:px-16 lg:px-28 bg-white min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-16 tracking-tight text-gray-900">
        ✨ Explore Our <span className="text-indigo-600">Collection</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
        {products.map((product) => (
          <div
            key={product.id}
            className="group bg-white border border-gray-200 rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden relative"
          >
            <div className="overflow-hidden rounded-t-3xl">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-500"
              />
              <span className="absolute top-3 left-3 bg-yellow-500 text-white text-xs px-3 py-1 rounded-full uppercase font-semibold shadow">
                🔥 Trending
              </span>
            </div>

            <div className="p-5 text-center">
              <h3 className="text-lg font-bold mb-1 text-gray-800 tracking-wide uppercase">
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{product.price}</p>

              <button
                onClick={() => addToCart(product)}
                className="w-full py-2 text-sm font-semibold tracking-wide rounded-full bg-black text-white hover:bg-white hover:text-black border border-black transition-all duration-300 mb-3"
              >
                🛒 Add to Cart
              </button>

              <Link to={`/product/${product.id}`}>
                <button className="w-full py-2 text-sm font-medium tracking-wide border border-gray-300 rounded-full hover:bg-black hover:text-white transition-all">
                  👁️ View Product
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Shop;
