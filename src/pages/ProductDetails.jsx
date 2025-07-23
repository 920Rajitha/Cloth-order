import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M');

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((p) => p.id === parseInt(id));
        setProduct(found);
      })
      .catch((err) => console.error('❌ Fetch error:', err));
  }, [id]);

  if (!product) return <div className="text-center mt-20 text-lg text-gray-600">Loading product...</div>;

  // Example: Add fallback images array if not already
  const galleryImages = product.gallery || [product.image];

  return (
    <div className="min-h-screen bg-white py-20 px-6 md:px-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div>
          <Carousel
            showThumbs={true}
            infiniteLoop={true}
            showStatus={false}
            className="rounded-2xl shadow"
          >
            {galleryImages.map((img, idx) => (
              <div key={idx}>
                <img src={img} alt={`Product ${idx + 1}`} className="h-[500px] object-cover rounded-xl" />
              </div>
            ))}
          </Carousel>
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-xl text-gray-700">Rs. {parseFloat(product.price).toLocaleString()}</p>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Size</label>
            <div className="flex gap-3">
              {['S', 'M', 'L', 'XL'].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
                    selectedSize === size
                      ? 'bg-black text-white'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => addToCart({ ...product, size: selectedSize })}
            className="mt-6 w-full py-3 rounded-full bg-black text-white hover:bg-white hover:text-black border border-black transition text-lg"
          >
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
