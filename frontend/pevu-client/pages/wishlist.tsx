import React, { useEffect, useState } from 'react';
import { useAuth } from '../store/auth';
import { useCart } from '../store/cart';
import { getWishlist, removeFromWishlist, WishlistItem, addToCart as addToCartAPI } from '../api/cart';
import { getProductById, Product } from '../api/products';
import { 
  getStoredWishlistItems, 
  removeStoredWishlistItem, 
  clearStoredWishlist,
  LocalWishlistItem 
} from '../utils/cartStorage';
import toast from 'react-hot-toast';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';

export default function WishlistPage() {
  const { user } = useAuth();
  const wishlistItems = useCart((s) => s.wishlistItems);
  const localWishlistItems = useCart((s) => s.localWishlistItems);
  const setWishlistItems = useCart((s) => s.setWishlistItems);
  const clearWishlistStore = useCart((s) => s.clearWishlist);
  const removeFromLocalWishlist = useCart((s) => s.removeFromLocalWishlist);
  const clearLocalWishlist = useCart((s) => s.clearLocalWishlist);
  const loadLocalWishlist = useCart((s) => s.loadLocalWishlist);
  const addToLocalCart = useCart((s) => s.addToLocalCart);
  const addToCart = useCart((s) => s.addToCart);
  
  const [products, setProducts] = useState<Record<number, Product>>({});
  const [loading, setLoading] = useState(false);

  // Load local wishlist on component mount
  useEffect(() => {
    loadLocalWishlist();
  }, [loadLocalWishlist]);

  // Load server wishlist for logged-in users
  useEffect(() => {
    if (user) {
      setLoading(true);
      getWishlist(user.id)
        .then(setWishlistItems)
        .catch(() => toast.error('Failed to load wishlist'))
        .finally(() => setLoading(false));
    }
  }, [user, setWishlistItems]);

  // Fetch product details for all wishlist items (server + local)
  useEffect(() => {
    async function fetchProducts() {
      const map: Record<number, Product> = {};
      
      // Handle server wishlist items
      for (const item of wishlistItems) {
        if (!products[item.productId]) {
          try {
            map[item.productId] = await getProductById(item.productId);
          } catch {}
        }
      }
      
      // Handle local wishlist items
      for (const item of localWishlistItems) {
        if (!products[item.productId]) {
          try {
            map[item.productId] = await getProductById(item.productId);
          } catch {}
        }
      }
      
      setProducts((prev) => ({ ...prev, ...map }));
    }
    if (wishlistItems.length > 0 || localWishlistItems.length > 0) fetchProducts();
  }, [wishlistItems, localWishlistItems]);

  const handleRemoveServer = async (item: WishlistItem) => {
    if (!user) return;
    try {
      await removeFromWishlist(user.id, item.productId);
      setWishlistItems(wishlistItems.filter((wi) => wi.id !== item.id));
      toast.success('Removed from wishlist');
    } catch {
      toast.error('Failed to remove from wishlist');
    }
  };

  const handleRemoveLocal = (item: LocalWishlistItem) => {
    removeFromLocalWishlist(item.productId);
    toast.success('Removed from wishlist');
  };

  const handleClearServer = async () => {
    if (!user) return;
    try {
      // Clear wishlist by removing all items one by one
      for (const item of wishlistItems) {
        await removeFromWishlist(user.id, item.productId);
      }
      clearWishlistStore();
      toast.success('Wishlist cleared');
    } catch {
      toast.error('Failed to clear wishlist');
    }
  };

  const handleClearLocal = () => {
    clearLocalWishlist();
    toast.success('Wishlist cleared');
  };

  const handleClearAll = async () => {
    if (user) {
      await handleClearServer();
    }
    handleClearLocal();
  };

  const handleMoveToCart = async (productId: number) => {
    if (!user) {
      // For non-logged-in users, add to local cart
      addToLocalCart(productId, 1);
      toast.success('Added to cart!');
    } else {
      // For logged-in users, add to server cart
      try {
        const cartItem = await addToCartAPI(user.id, productId, 1);
        // Update the cart store with the new item
        const currentCartItems = useCart.getState().cartItems;
        useCart.getState().setCartItems([...currentCartItems, cartItem]);
        toast.success('Added to cart!');
      } catch (error) {
        console.error('Failed to add to cart:', error);
        // Fallback to local cart
        addToLocalCart(productId, 1);
        toast.success('Added to cart! (offline mode)');
      }
    }
  };

  const totalItems = wishlistItems.length + localWishlistItems.length;

  return (
    <div className="max-w-4xl mx-auto mt-12 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">My Wishlist</h2>
      
      {loading && <div>Loading...</div>}
      
      {!loading && totalItems === 0 && (
        <div className="text-center py-8">
          <Heart className="mx-auto h-16 w-16 text-gray-300 mb-4" />
          <p className="text-gray-600 mb-4">Your wishlist is empty.</p>
          <a href="/" className="text-purple-600 hover:text-purple-800">Start Shopping</a>
        </div>
      )}
      
      {totalItems > 0 && (
        <>
          {/* Server Wishlist Items (for logged-in users) */}
          {user && wishlistItems.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Server Wishlist</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {wishlistItems.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                      {products[item.productId]?.images && products[item.productId].images.length > 0 ? (
                        <img 
                          src={products[item.productId].images[0]} 
                          alt={products[item.productId].title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <div className="text-gray-400 text-4xl">📦</div>
                      )}
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2 truncate">
                      {products[item.productId]?.title || 'Loading...'}
                    </h4>
                    <p className="text-purple-600 font-bold mb-3">
                      Ksh {products[item.productId]?.price || 0}
                    </p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleMoveToCart(item.productId)}
                        className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-3 rounded text-sm font-medium transition-colors flex items-center justify-center"
                      >
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Add to Cart
                      </button>
                      <button
                        onClick={() => handleRemoveServer(item)}
                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded text-sm font-medium transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Local Wishlist Items (for all users) */}
          {localWishlistItems.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                {user ? 'Local Wishlist' : 'Your Wishlist'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {localWishlistItems.map((item) => (
                  <div key={item.productId} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                      {products[item.productId]?.images && products[item.productId].images.length > 0 ? (
                        <img 
                          src={products[item.productId].images[0]} 
                          alt={products[item.productId].title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <div className="text-gray-400 text-4xl">📦</div>
                      )}
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2 truncate">
                      {products[item.productId]?.title || 'Loading...'}
                    </h4>
                    <p className="text-purple-600 font-bold mb-3">
                      Ksh {products[item.productId]?.price || 0}
                    </p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleMoveToCart(item.productId)}
                        className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-3 rounded text-sm font-medium transition-colors flex items-center justify-center"
                      >
                        <ShoppingCart className="h-4 w-4 mr-1" />
                    Add to Cart
                  </button>
                      <button
                        onClick={() => handleRemoveLocal(item)}
                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded text-sm font-medium transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                  </button>
                    </div>
                  </div>
            ))}
              </div>
            </div>
          )}

          {/* Summary and Actions */}
          <div className="border-t pt-6">
            <div className="flex justify-between items-center mb-4">
              <div className="font-bold text-lg">Total Items: {totalItems}</div>
              <button 
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors flex items-center"
                onClick={handleClearAll}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </button>
            </div>
            
            {!user && (
              <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mb-4">
                <p className="text-yellow-800 text-sm">
                  💡 <strong>Tip:</strong> Login to sync your wishlist across devices and access additional features.
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
} 