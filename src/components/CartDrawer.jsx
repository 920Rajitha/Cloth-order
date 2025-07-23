import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import OrderFormModal from './OrderFormModal';
import { generateInvoice } from '../utils/generateInvoice'; // ✅ Import invoice

const buildWhatsAppMessage = (formData, cartItems) => {
  const itemsText = cartItems.map((item, i) =>
    `🔹 *${item.name}*\n   Qty: ${item.qty}\n   Price: Rs. ${item.price}`
  ).join('\n\n');

  return `
📦 *NEW ORDER RECEIVED!*

👤 *Customer Info:*
▫️ Name: ${formData.name}
▫️ Phone: ${formData.contact}

🏠 *Shipping Address:*
▫️ ${formData.address1}
▫️ ${formData.address2}

📏 *Size:* ${formData.size}
💳 *Payment:* ${formData.payment === 'cod' ? 'Cash on Delivery 💵' : 'Bank Transfer 🏦'}

🛍️ *Items Ordered:*
${itemsText}

📊 *Order Summary:*
▫️ Total Items: ${cartItems.reduce((acc, item) => acc + item.qty, 0)}
▫️ Total Price: Rs. ${cartItems
    .reduce((acc, item) => acc + item.qty * parseFloat(item.price.replace(/[^\d.]/g, '')), 0)
    .toLocaleString()}

🕐 Please process this order ASAP!
  `;
};

const CartDrawer = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [success, setSuccess] = useState('');
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const totalQty = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cartItems.reduce((acc, item) => {
    const price = parseFloat(item.price.replace(/[^\d.]/g, ''));
    return acc + item.qty * price;
  }, 0);

  const handleSubmitOrder = async (formData) => {
    setLoading(true);
    const phone = '94767512269';
    const message = buildWhatsAppMessage(formData, cartItems);
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  
    try {
      console.log("🚀 Step 1: Starting order submit...");
      console.log("🧾 Generating invoice...");
  
      // Wrap invoice generation in its own try/catch to debug
      try {
        generateInvoice(formData, cartItems);
        console.log("✅ Invoice generated");
      } catch (invoiceErr) {
        console.error("❌ Invoice generation failed:", invoiceErr);
        throw new Error("Invoice generation failed");
      }
  
      // Wait 2 seconds
      setTimeout(() => {
        console.log("💬 Opening WhatsApp...");
        const newTab = window.open(url, '_blank');
  
        if (!newTab) {
          alert("⚠️ Please allow pop-ups for WhatsApp to open.");
        }
  
        clearCart();
        setShowOrderForm(false);
        setSuccess('✅ Order placed! Seller will contact you soon.');
        setLoading(false);
        alert("✅ Order placed! Seller will contact you soon.");
      }, 2000);
  
    } catch (err) {
      console.error("❌ Error placing order:", err);
      alert("❌ Something went wrong. Try again.");
      setLoading(false);
    }
  };
  

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50 p-4 border-l border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Your Cart</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">&times;</button>
        </div>

        {cartItems.length === 0 ? (
          <p className="text-gray-500">Cart is empty.</p>
        ) : (
          <>
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li key={item.id} className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 text-sm"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-6 text-sm text-gray-700 space-y-1">
              <div className="flex justify-between">
                <span>Total Items:</span>
                <span>{totalQty}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total:</span>
                <span>Rs. {totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => setShowOrderForm(true)}
              className="mt-6 w-full bg-black text-white py-2 hover:bg-white hover:text-black border border-black transition"
            >
              Place Order
            </button>

            {success && (
              <p className="mt-4 text-center text-sm text-green-600">{success}</p>
            )}
          </>
        )}
      </div>

      {showOrderForm && (
        <OrderFormModal
          onClose={() => setShowOrderForm(false)}
          onSubmit={handleSubmitOrder}
        />
      )}
    </>
  );
};

export default CartDrawer;
