import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/orders');
        setOrders(res.data);
      } catch (err) {
        console.error('❌ Failed to fetch orders', err);
      }
    };
    loadOrders();
  }, []);

  return (
    <section className="p-6 md:p-12 min-h-screen bg-gray-100 md:ml-24 lg:ml-40">

      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        🧑‍💼 Admin Panel - Orders
      </h1>

      <div className="grid gap-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow-sm rounded-2xl border border-gray-200 p-6"
          >
            {/* Order Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                📦 Order #{order.id}
              </h2>
              <span className="text-sm text-gray-500 mt-2 sm:mt-0">
                Placed on:{" "}
                <span className="font-medium text-gray-600">
                  {new Date(order.created_at).toLocaleString()}
                </span>
              </span>
            </div>

            {/* Order Items */}
            <div className="bg-gray-50 rounded-lg p-4">
              <table className="w-full text-sm text-gray-700">
                <thead>
                  <tr className="text-left border-b border-gray-200">
                    <th className="py-2">Product</th>
                    <th className="py-2 text-center">Qty</th>
                    <th className="py-2 text-right">Price (Rs)</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-2">{item.name}</td>
                      <td className="py-2 text-center">{item.qty}</td>
                      <td className="py-2 text-right">{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdminOrders;
