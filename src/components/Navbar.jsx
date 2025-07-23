import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartDrawer from './CartDrawer';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart, LogOut, Upload } from 'lucide-react';
import AuthModal from './AuthModal';

const Navbar = () => {
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [cartOpen, setCartOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  const handleShopClick = () => {
    if (user) {
      navigate('/shop');
    } else {
      setShowAuth(true);
    }
  };

  return (
    <>
      <aside className="fixed left-0 top-0 h-screen w-24 bg-black text-white flex flex-col items-center justify-between py-10 shadow-lg z-50">
        <div className="rotate-90 text-sm tracking-widest font-bold uppercase">Dana</div>

        <nav className="flex flex-col gap-10 text-xs items-center">
          {/* Home Link */}
          <Link to="/" className="hover:text-gray-300 transition">Home</Link>

          {/* Shop Button */}
          <button onClick={handleShopClick} className="hover:text-gray-300 transition">
            Shop
          </button>

          {/* Cart Icon */}
          <button onClick={() => setCartOpen(true)} className="relative">
            <ShoppingCart className="h-5 w-5" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-1 rounded-full">
                {cartItems.length}
              </span>
            )}
          </button>

          {/* Admin Upload Button */}
          {user?.isAdmin && (
            <Link to="/upload" title="Upload Product" className="hover:text-gray-300 transition">
              <Upload className="h-5 w-5" />
            </Link>
          )}

          {/* Logout Icon */}
          {user && (
            <button
              onClick={logout}
              className="hover:text-red-500 transition"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          )}
        </nav>

        <div className="text-[10px] text-gray-400 rotate-90">EST. 2025</div>
      </aside>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  );
};

export default Navbar;
