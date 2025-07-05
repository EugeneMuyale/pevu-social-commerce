import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ArrowLeft, Heart, MessageCircle, Share2, ShoppingCart, Bookmark } from "lucide-react";
import { Button } from "../../components/ui/button";
import { getProducts } from "../../api/products";
import { useAuth } from "../../store/auth";
import { useToast } from "../../hooks/use-toast";
import { useCart } from "../../store/cart";
import { likeProduct, getLikeCounts, shareProduct, getComments } from "../../api/social";
import { addToCart, addToWishlist } from "../../api/cart";
import { getStoredLikes, addStoredLike, removeStoredLike, getStoredLikeCounts, storeLikeCount, updateStoredLikeCount } from "../../utils/likeStorage";
import ProductMedia from "../../components/ProductMedia";

export default function CategoryPage() {
  const router = useRouter();
  const { category } = router.query;
  const { user } = useAuth();
  const { toast } = useToast();
  const { 
    cartItems, 
    wishlistItems, 
    localCartItems,
    localWishlistItems,
    addToCart: addToCartStore, 
    addToWishlist: addToWishlistStore, 
    addToLocalCart,
    addToLocalWishlist,
    isInLocalCart,
    isInLocalWishlist,
    loadLocalCart,
    loadLocalWishlist,
    setCartLoading, 
    setWishlistLoading 
  } = useCart();
  
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [likeCounts, setLikeCounts] = useState<Record<number, any>>({});
  const [commentCounts, setCommentCounts] = useState<Record<number, number>>({});
  const [likedProducts, setLikedProducts] = useState<Set<number>>(new Set());
  const [shareCounts, setShareCounts] = useState<Record<number, number>>({});

  // Category mapping for display names
  const categoryDisplayNames: Record<string, string> = {
    'phones-and-tablets': '📱 Phones & Tablets',
    'tvs-and-audio': '🖥️ TVs & Audio',
    'health-and-beauty': '💄 Health & Beauty',
    'fashion': '👗 Fashion',
    'computing': '💻 Computing',
    'recommended': '✨ Recommended For You',
    'top-picks': '⭐ Top Picks This Month'
  };

  const displayName = categoryDisplayNames[category as string] || category;

  useEffect(() => {
    if (category) {
      loadProducts();
    }
  }, [category]);

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

      // Load comment counts for products
      productsToLoad.forEach(async (product) => {
        try {
          const comments = await getComments(product.id);
          setCommentCounts(prev => ({
            ...prev,
            [product.id]: comments.length
          }));
        } catch (error) {
          // Silently fail - don't show errors for comment counts
          console.log('Failed to load comment counts for product:', product.id);
        }
      });
    }
  }, [products]);

  // Load stored likes and counts on component mount
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

    // Load local cart and wishlist
    loadLocalCart();
    loadLocalWishlist();
  }, [loadLocalCart, loadLocalWishlist]);

  // Helper function to get total like count (database + localStorage)
  const getTotalLikeCount = (productId: number) => {
    const databaseLikes = likeCounts[productId]?.likes || 0;
    const isLikedByUser = likedProducts.has(productId);
    return databaseLikes + (isLikedByUser ? 1 : 0);
  };

  const loadProducts = async () => {
    setLoading(true);
    try {
      const allProducts = await getProducts();
      
      // If no products returned, show empty state
      if (!allProducts || allProducts.length === 0) {
        setProducts([]);
        setError(null);
        return;
      }
      
      // Filter products based on category
      let filteredProducts = allProducts;
      if (category === 'phones-and-tablets') {
        filteredProducts = allProducts.filter(p => 
          p.category && p.category.includes("Phones and Tablets")
        );
      } else if (category === 'tvs-and-audio') {
        filteredProducts = allProducts.filter(p => 
          p.category && p.category.includes("TVs and Audio")
        );
      } else if (category === 'health-and-beauty') {
        filteredProducts = allProducts.filter(p => 
          p.category && p.category.includes("Health and Beauty")
        );
      } else if (category === 'fashion') {
        filteredProducts = allProducts.filter(p => 
          p.category && p.category.includes("Fashion")
        );
      } else if (category === 'computing') {
        filteredProducts = allProducts.filter(p => 
          p.category && p.category.includes("Computing")
        );
      }
      
      setProducts(filteredProducts);
      setError(null);
    } catch (err) {
      console.error('Error loading products:', err);
      setError("Failed to load products. Please try again.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = (productId: number) => {
    router.push(`/product/${productId}`);
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

    // For logged-in users, try API call first, fallback to localStorage if it fails
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
      console.log('API like failed, falling back to localStorage:', error);
      // Fallback to localStorage functionality if API fails
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
      // Don't show error toast for fallback behavior
    }
  };

  const handleComment = (productId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      toast({ title: "Login required", description: "Please login to comment." });
      return;
    }
    // Navigate to product page for comments
    router.push(`/product/${productId}#comments`);
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

  const handleAddToCart = async (productId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!user) {
      // For non-logged-in users, use localStorage
      if (isInLocalCart(productId)) {
        toast({ title: "Already in cart", description: "This item is already in your cart." });
        return;
      }
      
      addToLocalCart(productId, 1);
      toast({ title: "Added to cart!", description: "Item has been added to your cart." });
      return;
    }

    // For logged-in users, check server cart first
    if (cartItems.some(item => item.productId === productId)) {
      toast({ title: "Already in cart", description: "This item is already in your cart." });
      return;
    }

    setCartLoading(true);
    try {
      const cartItem = await addToCart(user.id, productId, 1);
      addToCartStore(cartItem);
      toast({ title: "Added to cart!", description: "Item has been added to your cart." });
    } catch (error) {
      console.error('Failed to add to cart:', error);
      // Fallback to localStorage if server fails
      if (!isInLocalCart(productId)) {
        addToLocalCart(productId, 1);
        toast({ title: "Added to cart!", description: "Item has been added to your cart (offline mode)." });
      } else {
        toast({ title: "Error", description: "Failed to add item to cart." });
      }
    } finally {
      setCartLoading(false);
    }
  };

  const handleAddToWishlist = async (productId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!user) {
      // For non-logged-in users, use localStorage
      if (isInLocalWishlist(productId)) {
        toast({ title: "Already in wishlist", description: "This item is already in your wishlist." });
        return;
      }
      
      addToLocalWishlist(productId);
      toast({ title: "Added to wishlist!", description: "Item has been added to your wishlist." });
      return;
    }

    // For logged-in users, check server wishlist first
    if (wishlistItems.some(item => item.productId === productId)) {
      toast({ title: "Already in wishlist", description: "This item is already in your wishlist." });
      return;
    }

    setWishlistLoading(true);
    try {
      const wishlistItem = await addToWishlist(user.id, productId);
      addToWishlistStore(wishlistItem);
      toast({ title: "Added to wishlist!", description: "Item has been added to your wishlist." });
    } catch (error) {
      console.error('Failed to add to wishlist:', error);
      // Fallback to localStorage if server fails
      if (!isInLocalWishlist(productId)) {
        addToLocalWishlist(productId);
        toast({ title: "Added to wishlist!", description: "Item has been added to your wishlist (offline mode)." });
      } else {
        toast({ title: "Error", description: "Failed to add item to wishlist." });
      }
    } finally {
      setWishlistLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="hover:bg-gray-100"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{displayName}</h1>
              <p className="text-sm text-gray-600">{products.length} products</p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No products found in this category</p>
            <Button onClick={() => router.back()}>Go Back</Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleProductClick(product.id)}
              >
                <div className="aspect-square mb-3 bg-gray-100 rounded-lg flex items-center justify-center">
                  <ProductMedia 
                    images={product.images}
                    videos={product.videos}
                    title={product.title}
                    className="w-full h-full"
                  />
                </div>
                <h3 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2">{product.title}</h3>
                <p className="text-green-600 font-bold text-sm mb-2">Ksh {product.price}</p>
                <p className="text-gray-600 text-xs mb-2">
                  {product.productQuantity > 0 ? `${product.productQuantity} in stock` : 'Out of stock'}
                </p>
                
                {/* Action Buttons */}
                <div className="flex gap-2 mb-2">
                <button 
                    className="flex-1 bg-purple-600 text-white text-sm py-2 rounded hover:bg-purple-700 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProductClick(product.id);
                  }}
                >
                  View Details
                </button>
                  <button
                    className="bg-blue-600 text-white text-xs px-2 py-2 rounded hover:bg-blue-700 transition-colors"
                    onClick={(e) => handleAddToCart(product.id, e)}
                    title="Add to Cart"
                  >
                    <ShoppingCart className="h-3 w-3" />
                  </button>
                  <button
                    className="bg-orange-600 text-white text-xs px-2 py-2 rounded hover:bg-orange-700 transition-colors"
                    onClick={(e) => handleAddToWishlist(product.id, e)}
                    title="Add to Wishlist"
                  >
                    <Bookmark className="h-3 w-3" />
                  </button>
                </div>
                
                {/* Social Interaction Buttons */}
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-100">
                  <button
                    className="flex items-center gap-1 text-xs text-gray-600 hover:text-red-500 transition-colors"
                    onClick={(e) => handleLike(product.id, e)}
                  >
                    <Heart className={`h-3 w-3 ${likedProducts.has(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                    <span>{getTotalLikeCount(product.id)}</span>
                  </button>
                  
                  <button
                    className="flex items-center gap-1 text-xs text-gray-600 hover:text-blue-500 transition-colors"
                    onClick={(e) => handleComment(product.id, e)}
                  >
                    <MessageCircle className="h-3 w-3" />
                    <span>{commentCounts[product.id] || 0}</span>
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 