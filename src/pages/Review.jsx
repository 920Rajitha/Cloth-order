import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Review = () => {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const res = await fetch('http://localhost:5000/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: user?.name || 'Anonymous',
          rating,
          message: text,
        }),
      });
  
      if (!res.ok) throw new Error('Review submit failed');
  
      setSubmitted(true);
    } catch (err) {
      console.error('❌ Review submission failed:', err);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-white py-20 px-6 md:px-20">
      <h1 className="text-3xl font-bold text-center mb-10 tracking-wide">Leave a Review 📝</h1>

      {submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl mx-auto text-center bg-green-100 border border-green-300 text-green-800 p-6 rounded-lg"
        >
          🎉 Thank you for your feedback!
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-gray-50 p-6 rounded-xl shadow space-y-4">
          <div>
            <label className="block mb-1 font-medium">Your Name</label>
            <input
              type="text"
              value={user?.name || ''}
              disabled
              className="w-full border rounded px-4 py-2 bg-gray-100 text-gray-700"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Your Rating</label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-2xl cursor-pointer ${rating >= star ? 'text-yellow-500' : 'text-gray-300'}`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Your Feedback</label>
            <textarea
              rows="4"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
              placeholder="Write your review here..."
              className="w-full border rounded px-4 py-2"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-black text-white rounded hover:bg-white hover:text-black border border-black transition flex justify-center items-center"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              'Submit Review'
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default Review;
