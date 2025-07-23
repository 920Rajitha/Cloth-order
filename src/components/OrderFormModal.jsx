import React, { useState } from 'react';

const OrderFormModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    address1: '',
    address2: '',
    size: '',
    payment: 'cod',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.contact || !formData.address1 || !formData.size) {
      alert("Please fill all required fields");
      return;
    }
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Enter Delivery Info</h2>

        <div className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="address1"
            placeholder="Address Line 1"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="address2"
            placeholder="Address Line 2"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <select
            name="size"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Size</option>
            <option value="S">Small (S)</option>
            <option value="M">Medium (M)</option>
            <option value="L">Large (L)</option>
            <option value="XL">Extra Large (XL)</option>
          </select>

          <div className="flex gap-4 mt-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={formData.payment === 'cod'}
                onChange={handleChange}
              />
              Cash on Delivery
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="bank"
                checked={formData.payment === 'bank'}
                onChange={handleChange}
              />
              Bank Transfer
            </label>
          </div>
        </div>

        <div className="flex justify-end mt-6 gap-4">
          <button onClick={onClose} className="border px-4 py-2 rounded">
            Cancel
          </button>
          <button onClick={handleSubmit} className="bg-black text-white px-4 py-2 rounded">
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderFormModal;
