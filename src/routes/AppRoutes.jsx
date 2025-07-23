import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Shop from '../pages/Shop';
import AdminOrders from '../pages/AdminOrders';
import ProtectedRoute from './ProtectedRoute';
import Review from '../pages/Review';
import ProductUpload from '../pages/ProductUpload'; 
import ProductDetails from '../pages/ProductDetails';// ✅ Import

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* 🔒 Shop is now protected */}
      <Route
        path="/shop"
        element={
          <ProtectedRoute>
            <Shop />
          </ProtectedRoute>
        }
      />

      {/* ⚠️ AdminOrders not protected yet — add later if needed */}
      <Route path="/admin/orders" element={<AdminOrders />} />
      
<Route path="/review" element={<Review />} />
<Route path="/upload" element={<ProductUpload />} />
<Route path="/product/:id" element={<ProductDetails />} />
    </Routes>
  );
};

export default AppRoutes;
