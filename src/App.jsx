import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar';
import UserBadge from './components/UserBadge'; // ✅
import { AuthProvider } from './context/AuthContext';




const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <UserBadge /> {/* ✅ Show user info top-right */}
        <AppRoutes />
      </Router>
      
    </AuthProvider>

  );
};

export default App;
