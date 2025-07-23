import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const RecentReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/reviews')
      .then((res) => res.json())
      .then((data) => {
        console.log("📥 Reviews fetched:", data);
        setReviews(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('❌ Review fetch error:', err);
        setError('Failed to load reviews.');
        setLoading(false);
      });
  }, []);

  const renderStars = (rating) => {
    const fullStars = '★'.repeat(rating);
    const emptyStars = '☆'.repeat(5 - rating);
    return (
      <span className="text-yellow-500 text-lg font-medium tracking-widest">
        {fullStars}{emptyStars}
      </span>
    );
  };

  return (
    <section className="py-20 px-6 md:px-20 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900">What Our Customers Say</h2>
        <div className="h-1 w-24 bg-black mx-auto mt-3 rounded-full"></div>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading reviews...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              whileHover={{ scale: 1.03 }}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300"
            >
              {/* Avatar Initial */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-lg">
                  {review.name.charAt(0).toUpperCase()}
                </div>
                <p className="font-semibold text-gray-800">{review.name}</p>
              </div>

              {/* Rating */}
              <div className="mb-3">{renderStars(review.rating)}</div>

              {/* Message */}
              <p className="text-gray-600 text-sm leading-relaxed">"{review.message}"</p>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default RecentReviews;
