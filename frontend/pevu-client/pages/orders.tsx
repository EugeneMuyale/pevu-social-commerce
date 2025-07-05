import React, { useEffect, useState } from 'react';
import { useAuth } from '../store/auth';
import { getOrders, OrderResponse, cancelOrder } from '../api/order';
import toast from 'react-hot-toast';

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setLoading(true);
      getOrders(user.id)
        .then(setOrders)
        .catch(() => toast.error('Failed to load orders'))
        .finally(() => setLoading(false));
    }
  }, [user]);

  const handleCancel = async (orderId: number) => {
    if (!user) return;
    try {
      const updated = await cancelOrder(orderId, user.id);
      setOrders((prev) => prev.map((o) => (o.id === orderId ? updated : o)));
      toast.success('Order cancelled');
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Failed to cancel order');
    }
  };

  if (!user) return <div className="p-8">Please login to view your orders.</div>;

  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      {loading && <div>Loading...</div>}
      {!loading && orders.length === 0 && <div>You have no orders yet.</div>}
      {orders.length > 0 && (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border rounded p-4">
              <div className="flex justify-between mb-2">
                <div className="font-bold">Order #{order.id}</div>
                <div className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</div>
              </div>
              <div className="mb-1">Status: <span className="font-semibold">{order.status}</span></div>
              {order.status === 'PENDING' && (
                <button
                  className="mt-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  onClick={() => handleCancel(order.id)}
                >
                  Cancel Order
                </button>
              )}
              <div className="mb-1">Total: <span className="font-semibold">Ksh {order.total}</span></div>
              <div className="mb-1">Payment: {order.paymentMethod}</div>
              <div className="mb-1">Shipping: {order.shippingAddress}</div>
              <div className="mb-1">Items:</div>
              <ul className="ml-4 list-disc">
                {order.items.map((item, i) => (
                  <li key={i}>
                    Product #{item.productId} — Qty: {item.quantity} — Ksh {item.price} each
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 