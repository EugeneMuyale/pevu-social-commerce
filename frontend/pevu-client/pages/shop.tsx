import React, { useState, useEffect } from "react";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { getProducts } from "../api/products";
import { useAuth } from "../store/auth";
import { useToast } from "../hooks/use-toast";
import { likeProduct, getLikeCounts, shareProduct } from "../api/social";
import { getStoredLikes, addStoredLike, removeStoredLike, getStoredLikeCounts, storeLikeCount, updateStoredLikeCount } from "../utils/likeStorage";

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [likeCounts, setLikeCounts] = useState<Record<number, any>>({});
  const [likedProducts, setLikedProducts] = useState<Set<number>>(new Set());
  const [shareCounts, setShareCounts] = useState<Record<number, number>>({});
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    loadProducts();
  }, []);

  // Load like counts for products (simple, non-blocking)
  useEffect(() => {
    if (products.length > 0) {
      // Load like counts for first 20 products only to avoid hanging
      const productsToLoad = products.slice(0, 20);
      productsToLoad.forEach(async (product) => {
        try {
          const counts = await getLikeCounts(product.id);
          setLikeCounts(prev => ({
            ...prev,
            [product.id]: counts
          }));
          // Store in localStorage for offline access
          storeLikeCount(product.id, counts.likes, counts.dislikes);
        } catch (error) {
          // Silently fail - don't show errors for like counts
          console.log('Failed to load like counts for product:', product.id);
        }
      });
    }
  }, [products]);

  // Load stored likes on component mount
  useEffect(() => {
    const storedLikes = getStoredLikes();
    setLikedProducts(storedLikes);
    
    // Load stored like counts
    const storedCounts = getStoredLikeCounts();
    setLikeCounts(prev => ({
      ...prev,
      ...Object.fromEntries(
        Object.entries(storedCounts).map(([productId, count]) => [
          parseInt(productId),
          { likes: count.likes, dislikes: count.dislikes }
        ])
      )
    }));
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = (productId: number) => {
    window.location.href = `/product/${productId}`;
  };

  const handleLike = async (productId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Allow likes for both logged-in and logged-out users
    if (!user) {
      // For logged-out users, use localStorage
      const isLiked = likedProducts.has(productId);
      if (isLiked) {
        setLikedProducts(prev => {
          const newSet = new Set(prev);
          newSet.delete(productId);
          return newSet;
        });
        removeStoredLike(productId);
        updateStoredLikeCount(productId, false);
        setLikeCounts(prev => ({
          ...prev,
          [productId]: { ...prev[productId], likes: Math.max(0, (prev[productId]?.likes || 0) - 1) }
        }));
      } else {
        setLikedProducts(prev => new Set([...prev, productId]));
        addStoredLike(productId);
        updateStoredLikeCount(productId, true);
        setLikeCounts(prev => ({
          ...prev,
          [productId]: { ...prev[productId], likes: (prev[productId]?.likes || 0) + 1 }
        }));
      }
      return;
    }

    // For logged-in users, make API call
    try {
      const isLiked = likedProducts.has(productId);
      await likeProduct(productId, user.id, isLiked ? 'DISLIKE' : 'LIKE');
      
      if (isLiked) {
        setLikedProducts(prev => {
          const newSet = new Set(prev);
          newSet.delete(productId);
          return newSet;
        });
        setLikeCounts(prev => ({
          ...prev,
          [productId]: { ...prev[productId], likes: Math.max(0, (prev[productId]?.likes || 0) - 1) }
        }));
      } else {
        setLikedProducts(prev => new Set([...prev, productId]));
        setLikeCounts(prev => ({
          ...prev,
          [productId]: { ...prev[productId], likes: (prev[productId]?.likes || 0) + 1 }
        }));
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to update like." });
    }
  };

  const handleComment = (productId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      toast({ title: "Login required", description: "Please login to comment." });
      return;
    }
    // Navigate to product page for comments
    window.location.href = `/product/${productId}#comments`;
  };

  const handleShare = async (productId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      toast({ title: "Login required", description: "Please login to share." });
      return;
    }

    try {
      await shareProduct({
        userId: user.id,
        productId: productId,
        platform: 'COPY_LINK'
      });
      
      setShareCounts(prev => ({
        ...prev,
        [productId]: (prev[productId] || 0) + 1
      }));
      
      // Copy link to clipboard
      const productUrl = `${window.location.origin}/product/${productId}`;
      await navigator.clipboard.writeText(productUrl);
      toast({ title: "Shared!", description: "Product link copied to clipboard." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to share product." });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Shop</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow p-4 animate-pulse">
                <div className="bg-gray-200 h-48 rounded mb-4"></div>
                <div className="bg-gray-200 h-4 rounded mb-2"></div>
                <div className="bg-gray-200 h-4 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Shop</h1>
          <div className="text-center text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Shop</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleProductClick(product.id)}
            >
              <div className="relative">
                <img
                  src={`/api/media/${product.mediaUrl}`}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder.svg';
                  }}
                />
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  {product.discountPercentage}% OFF
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-bold text-purple-600">
                    Ksh {product.discountedPrice}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    Ksh {product.price}
                  </span>
                </div>
                <p className="text-gray-600 text-xs mb-3">
                  {product.productQuantity > 0 ? `${product.productQuantity} in stock` : 'Out of stock'}
                </p>
                
                <button 
                  className="w-full bg-purple-600 text-white text-sm py-2 rounded hover:bg-purple-700 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProductClick(product.id);
                  }}
                >
                  View Details
                </button>
                
                {/* Social Interaction Buttons */}
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-100">
                  <button
                    className="flex items-center gap-1 text-xs text-gray-600 hover:text-red-500 transition-colors"
                    onClick={(e) => handleLike(product.id, e)}
                  >
                    <Heart className={`h-3 w-3 ${likedProducts.has(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                    <span>{likeCounts[product.id]?.likes || 0}</span>
                  </button>
                  
                  <button
                    className="flex items-center gap-1 text-xs text-gray-600 hover:text-blue-500 transition-colors"
                    onClick={(e) => handleComment(product.id, e)}
                  >
                    <MessageCircle className="h-3 w-3" />
                    <span>0</span>
                  </button>
                  
                  <button
                    className="flex items-center gap-1 text-xs text-gray-600 hover:text-green-500 transition-colors"
                    onClick={(e) => handleShare(product.id, e)}
                  >
                    <Share2 className="h-3 w-3" />
                    <span>{shareCounts[product.id] || 0}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 