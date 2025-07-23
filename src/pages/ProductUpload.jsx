import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const ProductUpload = () => {
  const { user } = useAuth();

  // 🔒 Restrict access if not admin
  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-600 font-semibold">⛔ Access Denied: Admins Only</p>
      </div>
    );
  }

  // 🧾 Upload form states
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [tag, setTag] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
  
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price);
      formData.append('tag', tag);
      formData.append('image', image); // ✅ Append image file
  
      const res = await fetch('http://localhost:5000/api/products/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (!res.ok) throw new Error('Upload failed');
  
      setSuccess('✅ Product uploaded successfully!');
      setName('');
      setPrice('');
      setImage('');
      setTag('');
    } catch (err) {
      console.error('❌ Upload failed:', err);
      setSuccess('❌ Upload failed.');
    } finally {
      setLoading(false);
    }
  };
  

  // ✅ Upload form (only shown if admin)
  return (
    <div className="min-h-screen bg-white py-20 px-6 md:px-20">
      <h1 className="text-3xl font-bold text-center mb-10">Upload New Product 📤</h1>

      <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-gray-50 p-6 rounded-xl shadow space-y-4">
        <div>
          <label className="block mb-1 font-medium">Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border rounded px-4 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Price</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full border rounded px-4 py-2"
            placeholder="Rs. 3500"
          />
        </div>

        <input
  type="file"
  accept="image/*"
  onChange={(e) => setImage(e.target.files[0])}
  required
  className="w-full border rounded px-4 py-2"
/>

        <div>
          <label className="block mb-1 font-medium">Tag (optional)</label>
          <input
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="w-full border rounded px-4 py-2"
            placeholder="e.g. 🔥 Trending"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-black text-white rounded hover:bg-white hover:text-black border border-black transition flex justify-center"
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          ) : (
            'Upload Product'
          )}
        </button>

        {success && <p className="text-center text-green-600 text-sm mt-2">{success}</p>}
      </form>
    </div>
  );
};

export default ProductUpload;
