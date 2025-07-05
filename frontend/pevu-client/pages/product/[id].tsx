import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProductById, Product } from '../../api/products';
import { useAuth } from '../../store/auth';
import toast from 'react-hot-toast';
import { addToCart, addToWishlist } from '../../api/cart';
import { useCart } from '../../store/cart';
import { Heart, MessageCircle, Share2, ShoppingCart, Bookmark, ArrowLeft, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { likeProduct, getLikeCounts, shareProduct, getComments } from '../../api/social';
import { getStoredLikes, addStoredLike, removeStoredLike, getStoredLikeCounts, storeLikeCount, updateStoredLikeCount } from '../../utils/likeStorage';
import Comments from '../../components/Comments';
import ProductMedia from '../../components/ProductMedia';

export default function ProductDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  // Move all Zustand hooks to the main component
  const cartItems = useCart((s) => s.cartItems);
  const wishlistItems = useCart((s) => s.wishlistItems);
  const localCartItems = useCart((s) => s.localCartItems);
  const localWishlistItems = useCart((s) => s.localWishlistItems);
  const setCartItems = useCart((s) => s.setCartItems);
  const setWishlistItems = useCart((s) => s.setWishlistItems);
  const addToLocalCart = useCart((s) => s.addToLocalCart);
  const addToLocalWishlist = useCart((s) => s.addToLocalWishlist);
  const isInLocalCart = useCart((s) => s.isInLocalCart);
  const isInLocalWishlist = useCart((s) => s.isInLocalWishlist);
  const loadLocalCart = useCart((s) => s.loadLocalCart);
  const loadLocalWishlist = useCart((s) => s.loadLocalWishlist);
  
  // Social interaction state
  const [likeCounts, setLikeCounts] = useState<{ likes: number; dislikes: number }>({ likes: 0, dislikes: 0 });
  const [likedProducts, setLikedProducts] = useState<Set<number>>(new Set());
  const [commentCount, setCommentCount] = useState(0);
  const [shareCount, setShareCount] = useState(0);
  
  // Collapsible sections state
  const [showDetails, setShowDetails] = useState(false);
  const [showSpecifications, setShowSpecifications] = useState(false);
  const [showAttributes, setShowAttributes] = useState(false);
  
  const { data: product, isLoading, error } = useQuery<Product | undefined>({
    queryKey: ['product', id],
    queryFn: () => (id ? getProductById(Number(id)) : Promise.resolve(undefined)),
    enabled: !!id,
  });

  // Load real social data
  useEffect(() => {
    if (product?.id) {
      loadSocialData();
      loadStoredLikes();
    }
  }, [product?.id]);

  // Load local cart and wishlist on component mount
  useEffect(() => {
    loadLocalCart();
    loadLocalWishlist();
  }, [loadLocalCart, loadLocalWishlist]);

  const loadSocialData = async () => {
    if (!product?.id) return;
    
    try {
      // Load real like counts
      const counts = await getLikeCounts(product.id);
      setLikeCounts(counts);
      storeLikeCount(product.id, counts.likes, counts.dislikes);
      
      // Load real comment count
      const comments = await getComments(product.id);
      setCommentCount(comments.length);
    } catch (error) {
      console.log('Failed to load social data:', error);
      // Load from localStorage as fallback
      const storedCounts = getStoredLikeCounts();
      if (storedCounts[product.id]) {
        setLikeCounts(storedCounts[product.id]);
      }
    }
  };

  const loadStoredLikes = () => {
    const storedLikes = getStoredLikes();
    setLikedProducts(storedLikes);
  };

  const handleAddToCart = async () => {
    if (!product) return;
    
    if (!user) {
      // For non-logged-in users, use localStorage
      if (isInLocalCart(product.id)) {
        toast.error('Already in cart');
        return;
      }
      
      addToLocalCart(product.id, 1);
      toast.success('Added to cart!');
      return;
    }

    // For logged-in users, check server cart first
    if (cartItems.some(item => item.productId === product.id)) {
      toast.error('Already in cart');
      return;
    }

    try {
      const item = await addToCart(user.id, product.id, 1);
      setCartItems([...cartItems, item]);
      toast.success('Added to cart!');
    } catch (error) {
      console.error('Failed to add to cart:', error);
      // Fallback to localStorage if server fails
      if (!isInLocalCart(product.id)) {
        addToLocalCart(product.id, 1);
        toast.success('Added to cart! (offline mode)');
      } else {
      toast.error('Failed to add to cart');
      }
    }
  };

  const handleAddToWishlist = async () => {
    if (!product) return;
    
    if (!user) {
      // For non-logged-in users, use localStorage
      if (isInLocalWishlist(product.id)) {
        toast.error('Already in wishlist');
        return;
      }
      
      addToLocalWishlist(product.id);
      toast.success('Added to wishlist!');
      return;
    }

    // For logged-in users, check server wishlist first
    if (wishlistItems.some(item => item.productId === product.id)) {
      toast.error('Already in wishlist');
      return;
    }

    try {
      const item = await addToWishlist(user.id, product.id);
      setWishlistItems([...wishlistItems, item]);
      toast.success('Added to wishlist!');
    } catch (error) {
      console.error('Failed to add to wishlist:', error);
      // Fallback to localStorage if server fails
      if (!isInLocalWishlist(product.id)) {
        addToLocalWishlist(product.id);
        toast.success('Added to wishlist! (offline mode)');
      } else {
      toast.error('Failed to add to wishlist');
      }
    }
  };

  // Real social interaction handlers
  const handleLike = async () => {
    if (!product?.id) return;
    
    // Allow likes for both logged-in and logged-out users
    if (!user) {
      // For logged-out users, use localStorage
      const isLiked = likedProducts.has(product.id);
      if (isLiked) {
        setLikedProducts(prev => {
          const newSet = new Set(prev);
          newSet.delete(product.id);
          return newSet;
        });
        removeStoredLike(product.id);
        updateStoredLikeCount(product.id, false);
        setLikeCounts(prev => ({
          ...prev,
          likes: Math.max(0, prev.likes - 1)
        }));
      } else {
        setLikedProducts(prev => new Set([...prev, product.id]));
        addStoredLike(product.id);
        updateStoredLikeCount(product.id, true);
        setLikeCounts(prev => ({
          ...prev,
          likes: prev.likes + 1
        }));
      }
      return;
    }

    // For logged-in users, make API call
    try {
      const isLiked = likedProducts.has(product.id);
      await likeProduct(product.id, user.id, isLiked ? 'DISLIKE' : 'LIKE');
      
      if (isLiked) {
        setLikedProducts(prev => {
          const newSet = new Set(prev);
          newSet.delete(product.id);
          return newSet;
        });
        setLikeCounts(prev => ({
          ...prev,
          likes: Math.max(0, prev.likes - 1)
        }));
      } else {
        setLikedProducts(prev => new Set([...prev, product.id]));
        setLikeCounts(prev => ({
          ...prev,
          likes: prev.likes + 1
        }));
      }
    } catch (error) {
      toast.error('Failed to update like');
    }
  };

  const handleComment = () => {
    if (!user) {
      toast.error('Please login to comment');
      return;
    }
    // Scroll to comments section
    document.getElementById('comments-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleShare = async () => {
    if (!user || !product) {
      toast.error('Please login to share');
      return;
    }

    try {
      await shareProduct({
        userId: user.id,
        productId: product.id,
        platform: 'COPY_LINK'
      });
      
      setShareCount(prev => prev + 1);
      
      // Copy link to clipboard
      const productUrl = `${window.location.origin}/product/${product.id}`;
      await navigator.clipboard.writeText(productUrl);
      toast.success('Product link copied to clipboard!');
    } catch (error) {
      toast.error('Failed to share product');
    }
  };

  if (isLoading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
    </div>
  );
  
  if (error || !product) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-red-500 text-xl mb-2">Product not found</div>
        <button 
          onClick={() => router.back()}
          className="text-purple-600 hover:text-purple-700"
        >
          Go back
        </button>
      </div>
    </div>
  );

  const inCart = !!cartItems.find((item) => item.productId === product.id);
  const inWishlist = !!wishlistItems.find((item) => item.productId === product.id);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <button 
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </button>
          <h1 className="text-lg font-semibold text-gray-900 truncate max-w-xs">
            {product.title}
          </h1>
          <div className="w-10"></div> {/* Spacer for centering */}
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Product Card - Social Media Style */}
        <div className="bg-white rounded-lg shadow-sm mb-4 mx-4 mt-4">
          {/* Product Image - TikTok Style */}
          <div className="relative">
            <div className="aspect-[4/5] bg-gray-100 overflow-hidden">
              <ProductMedia 
                images={product.images}
                videos={product.videos}
                title={product.title}
                className="w-full h-full"
              />
            </div>
            
            {/* Price Badge - Overlay */}
            <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-lg shadow-lg">
              Ksh {product.price.toLocaleString()}
            </div>
          </div>

          {/* Product Info */}
          <div className="p-4">
            {/* Title and Category */}
            <div className="mb-3">
              <h2 className="text-xl font-bold text-gray-900 mb-1">{product.title}</h2>
              <div className="flex items-center text-gray-500 text-sm">
                <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
                  {product.category}
                </span>
              </div>
            </div>

            {/* Price Section */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl font-bold text-purple-600">
                Ksh {product.price.toLocaleString()}
              </span>
              <div className="flex items-center text-yellow-500">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm text-gray-600 ml-1">New Product</span>
              </div>
            </div>

            {/* Action Buttons - Social Media Style */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                {/* Like Button */}
                <button 
                  onClick={handleLike}
                  className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors"
                >
                  <Heart className={`h-6 w-6 ${likedProducts.has(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  <span className="text-sm font-medium">{likeCounts.likes}</span>
                </button>
                
                {/* Comment Button */}
                <button 
                  onClick={handleComment}
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors"
                >
                  <MessageCircle className="h-6 w-6" />
                  <span className="text-sm font-medium">{commentCount}</span>
                </button>
                
                {/* Share Button */}
                <button 
                  onClick={handleShare}
                  className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors"
                >
                  <Share2 className="h-6 w-6" />
                  <span className="text-sm font-medium">{shareCount}</span>
                </button>
              </div>
              
              {/* Save Button */}
              <button 
                onClick={handleAddToWishlist}
                disabled={inWishlist}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                  inWishlist
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Bookmark className={`h-5 w-5 ${inWishlist ? 'fill-current' : ''}`} />
                <span className="text-sm font-medium">
                  {inWishlist ? 'Saved' : 'Save'}
                </span>
              </button>
            </div>

            {/* Buy Button - Prominent */}
            <button
              onClick={handleAddToCart}
              disabled={inCart}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 ${
                inCart
                  ? 'bg-green-600 text-white cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                {inCart ? 'Added to Cart' : 'Add to Cart'}
              </div>
            </button>
          </div>
        </div>

        {/* Comments Section - Social Media Style */}
        <div id="comments-section" className="bg-white rounded-lg shadow-sm mb-4 mx-4">
          <div className="p-4">
            <Comments productId={product.id} />
          </div>
        </div>

        {/* Product Details */}
        <div className="bg-white rounded-lg shadow-sm mb-4 mx-4">
          <div className="p-4">
            {/* Collapsible Product Details Header */}
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center justify-between w-full text-left mb-4"
            >
              <h3 className="text-lg font-bold text-gray-900">Product Details</h3>
              {showDetails ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>
            
            {/* Product Details Content */}
            {showDetails && (
              <div>
                {/* Description - Show first if available */}
                {product.details && (
                  <div>
                    <p className="text-gray-700 leading-relaxed">{product.details}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Attributes/Features */}
        {product.attributes && product.attributes.trim() !== '' && product.attributes !== '{}' && (
          <div className="bg-white rounded-lg shadow-sm mb-4 mx-4">
            <div className="p-4">
              {/* Collapsible Attributes Header */}
              <button
                onClick={() => setShowAttributes(!showAttributes)}
                className="flex items-center justify-between w-full text-left mb-4"
              >
                <h3 className="text-lg font-bold text-gray-900">Features</h3>
                {showAttributes ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              
              {/* Attributes Content */}
              {showAttributes && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {(() => {
                    try {
                      const attrs = JSON.parse(product.attributes);
                      return Object.entries(attrs).map(([key, value]) => (
                        <div key={key} className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-sm font-medium text-gray-700 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                          <div className="text-sm text-gray-600">{String(value)}</div>
                        </div>
                      ));
                    } catch (error) {
                      return (
                        <div className="text-gray-700 whitespace-pre-wrap">
                          {product.attributes}
                        </div>
                      );
                    }
                  })()}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Specifications */}
        {product.specifications && product.specifications.trim() !== '' && (
          <div className="bg-white rounded-lg shadow-sm mb-4 mx-4">
            <div className="p-4">
              {/* Collapsible Specifications Header */}
              <button
                onClick={() => setShowSpecifications(!showSpecifications)}
                className="flex items-center justify-between w-full text-left mb-4"
              >
                <h3 className="text-lg font-bold text-gray-900">Specifications</h3>
                {showSpecifications ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              
              {/* Specifications Content */}
              {showSpecifications && (
                <div className="space-y-2">
                  {(() => {
                    try {
                      const specs = JSON.parse(product.specifications);
                      return Object.entries(specs).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
                          <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                          <span className="text-gray-900 font-medium">{String(value)}</span>
                        </div>
                      ));
                    } catch (error) {
                      return (
                        <div className="text-gray-700 whitespace-pre-wrap">
                          {product.specifications}
                        </div>
                      );
                    }
                  })()}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Related Products Suggestion */}
        <div className="bg-white rounded-lg shadow-sm mb-8 mx-4">
          <div className="p-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">You might also like</h3>
            <div className="text-center text-gray-500 py-8">
              <div className="text-4xl mb-2">🛍️</div>
              <p>More products coming soon...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 