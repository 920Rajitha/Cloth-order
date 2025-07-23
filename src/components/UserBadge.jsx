import React from 'react';
import { useAuth } from '../context/AuthContext';

const UserBadge = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-black to-gray-800 text-white text-sm px-6 py-3 rounded-full shadow-xl z-50 flex items-center gap-4">
      <span className="text-lg font-semibold tracking-wide">
        👋 Welcome, <span className="text-yellow-300">{user.name}</span>
      </span>
     
    </div>
  );
};

export default UserBadge;
