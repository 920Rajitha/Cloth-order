import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, Phone, ShoppingBag } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white px-6 md:px-20 py-12 mt-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* 🧥 Brand */}
        <div>
          <h3 className="text-xl font-bold uppercase tracking-wide">Oni.shop</h3>
          <p className="text-sm mt-3 text-gray-400">
            Unique fashion for the bold. Designed by dreamers, worn by legends.
          </p>
        </div>

        {/* 🧭 Navigation */}
        <div>
          <h4 className="font-semibold mb-3 text-white">Navigation</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/shop" className="hover:text-white">Shop</Link></li>
            <li><Link to="/review" className="hover:text-white">Reviews</Link></li>
          </ul>
        </div>

        {/* 📱 Contact */}
        <div>
          <h4 className="font-semibold mb-3 text-white">Contact Us</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-center gap-2"><Phone size={16} /> +94 76 751 2269</li>
            <li className="flex items-center gap-2"><Mail size={16} /> support@onishop.lk</li>
          </ul>
        </div>

        {/* 🌐 Social */}
        <div>
          <h4 className="font-semibold mb-3 text-white">Follow Us</h4>
          <div className="flex gap-4 text-gray-400">
            <a href="#" className="hover:text-white"><Facebook /></a>
            <a href="#" className="hover:text-white"><Instagram /></a>
            <a href="#" className="hover:text-white"><ShoppingBag /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-10 pt-6 text-sm text-center text-gray-500">
        © {new Date().getFullYear()} Oni.shop — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
