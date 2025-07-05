import React, { useEffect, useState } from 'react';
import { useAuth } from '../store/auth';
import { useCart } from '../store/cart';
import { getCart, clearCart } from '../api/cart';
import { getProductById, Product } from '../api/products';
import { placeOrder, placeGuestOrder, OrderItemRequest, OrderRequest } from '../api/order';
import { 
  getStoredCartItems, 
  clearStoredCart,
  LocalCartItem 
} from '../utils/cartStorage';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

const paymentMethods = ['Pay on Delivery', 'PayPal (mock)', 'M-Pesa (mock)'];

export default function CheckoutPage() {
  const { user } = useAuth();
  const cartItems = useCart((s) => s.cartItems);
  const localCartItems = useCart((s) => s.localCartItems);
  const setCartItems = useCart((s) => s.setCartItems);
  const clearCartStore = useCart((s) => s.clearCart);
  const clearLocalCart = useCart((s) => s.clearLocalCart);
  const loadLocalCart = useCart((s) => s.loadLocalCart);
  const [products, setProducts] = useState<Record<number, Product>>({});
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);
  const [guestEmail, setGuestEmail] = useState('');
  const [guestName, setGuestName] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);
  const router = useRouter();

  // Load local cart on component mount
  useEffect(() => {
    loadLocalCart();
  }, [loadLocalCart]);

  useEffect(() => {
    if (user) {
      getCart(user.id).then(setCartItems).catch(() => {});
    }
  }, [user, setCartItems]);

  useEffect(() => {
    async function fetchProducts() {
      const map: Record<number, Product> = {};
      
      // Handle server cart items
      for (const item of cartItems) {
        if (!products[item.productId]) {
          try {
            map[item.productId] = await getProductById(item.productId);
          } catch {}
        }
      }
      
      // Handle local cart items
      for (const item of localCartItems) {
        if (!products[item.productId]) {
          try {
            map[item.productId] = await getProductById(item.productId);
          } catch {}
        }
      }
      
      setProducts((prev) => ({ ...prev, ...map }));
    }
    if (cartItems.length > 0 || localCartItems.length > 0) fetchProducts();
  }, [cartItems, localCartItems]);

  // Calculate totals for both server and local items
  const serverTotal = cartItems.reduce((sum, item) => sum + (products[item.productId]?.price || 0) * item.quantity, 0);
  const localTotal = localCartItems.reduce((sum, item) => sum + (products[item.productId]?.price || 0) * item.quantity, 0);
  const total = serverTotal + localTotal;
  const totalItems = cartItems.length + localCartItems.length;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingAddress.trim()) return toast.error('Enter shipping address');
    if (totalItems === 0) return toast.error('Cart is empty');
    
    // Validate guest info if not logged in
    if (!user) {
      if (!guestEmail.trim()) return toast.error('Enter your email');
      if (!guestName.trim()) return toast.error('Enter your name');
    }
    
    setLoading(true);
    try {
      // Combine server and local cart items
      const allItems: OrderItemRequest[] = [
        ...cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: products[item.productId]?.price || 0,
        })),
        ...localCartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: products[item.productId]?.price || 0,
        }))
      ];
      
      let order;
      if (user) {
        // Logged in user
        const req: OrderRequest = {
          userId: user.id,
          items: allItems,
          shippingAddress,
          total,
          paymentMethod,
        };
        order = await placeOrder(user.id, req);
        await clearCart(user.id);
      } else {
        // Guest user
        const req: OrderRequest = {
          guestEmail: guestEmail.trim(),
          guestName: guestName.trim(),
          items: allItems,
          shippingAddress,
          total,
          paymentMethod,
        };
        order = await placeGuestOrder(req);
      }
      
      setOrderId(order.id);
      clearCartStore();
      clearLocalCart();
      toast.success('Order placed!');
    } catch {
      toast.error('Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (orderId) return (
    <div className="max-w-lg mx-auto mt-12 p-6 bg-white rounded shadow text-center">
      <h2 className="text-2xl font-bold mb-4">Order Placed!</h2>
      <div className="mb-4">Your order #{orderId} has been placed successfully.</div>
      <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => router.push('/')}>Back to Home</button>
    </div>
  );

  return (
    <div className="max-w-lg mx-auto mt-12 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      {!user && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
          <p className="text-sm text-blue-800">Guest checkout - no account required</p>
        </div>
      )}
      <form onSubmit={handlePlaceOrder} className="space-y-4">
        {!user && (
          <>
            <div>
              <label className="block mb-1 font-medium">Full Name *</label>
              <input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full border p-2 rounded"
                required
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email *</label>
              <input
                type="email"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                className="w-full border p-2 rounded"
                required
                placeholder="Enter your email address"
              />
            </div>
          </>
        )}
        <div>
          <label className="block mb-1 font-medium">Shipping Address *</label>
          <textarea
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            className="w-full border p-2 rounded"
            required
            placeholder="Enter your complete shipping address"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full border p-2 rounded"
          >
            {paymentMethods.map((pm) => (
              <option key={pm} value={pm}>{pm}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Order Summary</label>
          <ul className="mb-2">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>{products[item.productId]?.title || '...'}</span>
                <span>
                  {item.quantity} x Ksh {products[item.productId]?.price || 0} = Ksh {(products[item.productId]?.price || 0) * item.quantity}
                </span>
              </li>
            ))}
            {localCartItems.map((item) => (
              <li key={`local-${item.productId}`} className="flex justify-between">
                <span>{products[item.productId]?.title || '...'}</span>
                <span>
                  {item.quantity} x Ksh {products[item.productId]?.price || 0} = Ksh {(products[item.productId]?.price || 0) * item.quantity}
                </span>
              </li>
            ))}
          </ul>
          <div className="font-bold">Total: Ksh {total}</div>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded" disabled={loading}>
          {loading ? 'Placing Order...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
} 