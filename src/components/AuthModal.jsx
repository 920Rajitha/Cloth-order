import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const AuthModal = ({ onClose }) => {
  const [mode, setMode] = useState('register');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { login, register } = useAuth();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (mode === 'login') {
        await login(formData.email, formData.password);
        setMessage('✅ Login successful! You can now shop.');
        setTimeout(() => onClose(), 1500);
      } else {
        await register(formData.name, formData.email, formData.password);
        setMessage('🎉 Registration successful!');
        setTimeout(() => {
          setMode('login');
          setMessage('');
          setFormData({ name: '', email: '', password: '' });
        }, 1500);
      }
    } catch (err) {
      setMessage('❌ Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-md p-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">
            {mode === 'login' ? 'Login' : 'Register'}
          </h2>
          <button onClick={onClose} className="text-gray-500 text-xl">&times;</button>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            className={`flex-1 py-2 border rounded ${mode === 'register' ? 'bg-black text-white' : 'text-black'}`}
            onClick={() => setMode('register')}
          >
            Register
          </button>
          <button
            className={`flex-1 py-2 border rounded ${mode === 'login' ? 'bg-black text-white' : 'text-black'}`}
            onClick={() => setMode('login')}
          >
            Login
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border rounded px-4 py-2"
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border rounded px-4 py-2"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border rounded px-4 py-2"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-black text-white rounded hover:bg-white hover:text-black border border-black transition flex items-center justify-center"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              mode === 'login' ? 'Login' : 'Create Account'
            )}
          </button>
        </form>

        {message && (
          <motion.p
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 text-center text-sm text-green-600"
          >
            {message}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default AuthModal;