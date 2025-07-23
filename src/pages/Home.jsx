import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import FeaturedProducts from '../components/FeaturedProducts';
import { motion } from 'framer-motion';
import RecentReviews from '../components/RecentReviews';
import Footer from "../components/Footer";


const Home = () => {
  return (
    <div className="ml-20">
      <HeroSection />
      <AboutSection />
      <FeaturedProducts />

      <div className="text-center mt-10">
        <Link to="/review">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-black text-white px-6 py-2 rounded hover:bg-white hover:text-black border border-black transition"
          >
            ✍️ Leave a Review
          </motion.button>
        </Link>
      </div>

      <RecentReviews />
      <Footer />
    </div>
  );
};

export default Home;
