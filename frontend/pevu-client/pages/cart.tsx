import React, { useEffect, useState } from 'react';
import { useAuth } from '../store/auth';
import { useCart } from '../store/cart';
import { getCart, updateCartItem, removeFromCart, clearCart, CartItem } from '../api/cart';
import { getProductById, Product } from '../api/products';
import { 
  getStoredCartItems, 
  updateStoredCartItem, 
  removeStoredCartItem, 
  clearStoredCart,
  LocalCartItem 
} from '../utils/cartStorage';
import toast from 'react-hot-toast';

export default function CartPage() {
  const { user } = useAuth();
  const cartItems = useCart((s) => s.cartItems);
  const localCartItems = useCart((s) => s.localCartItems);
  const setCartItems = useCart((s) => s.setCartItems);
  const clearCartStore = useCart((s) => s.clearCart);
  const updateLocalCartItem = useCart((s) => s.updateLocalCartItem);
  const removeFromLocalCart = useCart((s) => s.removeFromLocalCart);
  const clearLocalCart = useCart((s) => s.clearLocalCart);
  const loadLocalCart = useCart((s) => s.loadLocalCart);
  
  const [products, setProducts] = useState<Record<number, Product>>({});
  const [loading, setLoading] = useState(false);

  // Load local cart on component mount
  useEffect(() => {
    loadLocalCart();
  }, [loadLocalCart]);

  // Load server cart for logged-in users
  useEffect(() => {
    if (user) {
      setLoading(true);
      getCart(user.id)
        .then(setCartItems)
        .catch(() => toast.error('Failed to load cart'))
        .finally(() => setLoading(false));
    }
  }, [user, setCartItems]);

  // Fetch product details for all cart items (server + local)
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

  const handleUpdateServer = async (item: CartItem, quantity: number) => {
    if (!user) return;
    try {
      const updated = await updateCartItem(user.id, item.productId, quantity);
      setCartItems(cartItems.map((ci) => (ci.id === item.id ? updated : ci)));
      toast.success('Cart updated');
    } catch {
      toast.error('Failed to update cart');
    }
  };

  const handleUpdateLocal = (item: LocalCartItem, quantity: number) => {
    updateLocalCartItem(item.productId, quantity);
    toast.success('Cart updated');
  };

  const handleRemoveServer = async (item: CartItem) => {
    if (!user) return;
    try {
      await removeFromCart(user.id, item.productId);
      setCartItems(cartItems.filter((ci) => ci.id !== item.id));
      toast.success('Removed from cart');
    } catch {
      toast.error('Failed to remove from cart');
    }
  };

  const handleRemoveLocal = (item: LocalCartItem) => {
    removeFromLocalCart(item.productId);
    toast.success('Removed from cart');
  };

  const handleClearServer = async () => {
    if (!user) return;
    try {
      await clearCart(user.id);
      clearCartStore();
      toast.success('Cart cleared');
    } catch {
      toast.error('Failed to clear cart');
    }
  };

  const handleClearLocal = () => {
    clearLocalCart();
    toast.success('Cart cleared');
  };

  const handleClearAll = async () => {
    if (user) {
      await handleClearServer();
    }
    handleClearLocal();
  };

  // Calculate totals for both server and local items
  const serverTotal = cartItems.reduce((sum, item) => sum + (products[item.productId]?.price || 0) * item.quantity, 0);
  const localTotal = localCartItems.reduce((sum, item) => sum + (products[item.productId]?.price || 0) * item.quantity, 0);
  const total = serverTotal + localTotal;
  const totalItems = cartItems.length + localCartItems.length;

  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">My Cart</h2>
      
      {loading && <div>Loading...</div>}
      
      {!loading && totalItems === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">Your cart is empty.</p>
          <a href="/" className="text-purple-600 hover:text-purple-800">Continue Shopping</a>
        </div>
      )}
      
      {totalItems > 0 && (
        <>
          {/* Server Cart Items (for logged-in users) */}
          {user && cartItems.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-700">Server Cart</h3>
          <table className="w-full mb-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Product</th>
                <th className="p-2">Price (Ksh)</th>
                <th className="p-2">Qty</th>
                <th className="p-2">Total</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-2">{products[item.productId]?.title || '...'}</td>
                  <td className="p-2">Ksh {products[item.productId]?.price || 0}</td>
                  <td className="p-2">
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                          onChange={(e) => handleUpdateServer(item, Number(e.target.value))}
                          className="w-16 border p-1 rounded"
                        />
                      </td>
                      <td className="p-2">Ksh {(products[item.productId]?.price || 0) * item.quantity}</td>
                      <td className="p-2">
                        <button className="text-red-600 hover:text-red-800" onClick={() => handleRemoveServer(item)}>
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Local Cart Items (for all users) */}
          {localCartItems.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-700">
                {user ? 'Local Cart' : 'Your Cart'}
              </h3>
              <table className="w-full mb-4">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-left">Product</th>
                    <th className="p-2">Price (Ksh)</th>
                    <th className="p-2">Qty</th>
                    <th className="p-2">Total</th>
                    <th className="p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {localCartItems.map((item) => (
                    <tr key={item.productId} className="border-t">
                      <td className="p-2">{products[item.productId]?.title || '...'}</td>
                      <td className="p-2">Ksh {products[item.productId]?.price || 0}</td>
                      <td className="p-2">
                        <input
                          type="number"
                          min={1}
                          value={item.quantity}
                          onChange={(e) => handleUpdateLocal(item, Number(e.target.value))}
                      className="w-16 border p-1 rounded"
                    />
                  </td>
                  <td className="p-2">Ksh {(products[item.productId]?.price || 0) * item.quantity}</td>
                  <td className="p-2">
                        <button className="text-red-600 hover:text-red-800" onClick={() => handleRemoveLocal(item)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
            </div>
          )}

          {/* Summary and Actions */}
          <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-4">
              <div className="font-bold text-lg">Total: Ksh {total}</div>
              <button 
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors" 
                onClick={handleClearAll}
              >
                Clear All
              </button>
            </div>
            
            {!user && (
              <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mb-4">
                <p className="text-yellow-800 text-sm">
                  💡 <strong>Tip:</strong> Login to sync your cart across devices and access additional features.
                </p>
              </div>
            )}
            
            <button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-semibold transition-colors"
              onClick={() => window.location.href = '/checkout'}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
} 