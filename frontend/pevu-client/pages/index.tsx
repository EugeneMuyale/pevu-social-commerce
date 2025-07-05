"use client";

import React, { useState, useEffect } from "react";
import {
  Heart,
  MessageCircle,
  Share,
  Play,
  Users,
  ShoppingBag,
  Home,
  Search,
  Plus,
  User,
  Clock,
  ShoppingCart,
  Bookmark,
  ChevronRight,
  Share2,
  Star,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardFooter } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { toast } from "../hooks/use-toast";
import { getProducts, Product as BackendProduct } from "../api/products";
import { useAuth } from "../store/auth";
import { useCart, CartItem, WishlistItem } from "../store/cart";
import { likeProduct, getLikeCounts, LikeType, LikeCountResponse, shareProduct, getComments } from "../api/social";
import { getProfile, UserProfile } from "../api/profile";
import { getNotifications, Notification } from "../api/notification";
import Link from "next/link";
import { useRouter } from "next/router";
import OptimizedImage from '../components/OptimizedImage';
import ProductMedia from '../components/ProductMedia';
import { useToast } from "../hooks/use-toast";
import { getStoredLikes, addStoredLike, removeStoredLike, getStoredLikeCounts, storeLikeCount, updateStoredLikeCount } from "../utils/likeStorage";
import { addToCart as addToCartAPI, addToWishlist as addToWishlistAPI } from "../api/cart";
import ProductCard from '../components/ProductCard';
import ProductCardSkeleton from '../components/ProductCardSkeleton';
import HeroSection from '../components/HeroSection';
import StoriesSection from '../components/StoriesSection';

export default function PevuApp() {
  const router = useRouter();
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
  
  const [activeTab, setActiveTab] = useState("home");
  const [products, setProducts] = useState<BackendProduct[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState<string | null>(null);
  const [likeCounts, setLikeCounts] = useState<Record<number, any>>({});
  const [commentCounts, setCommentCounts] = useState<Record<number, number>>({});
  const [likedProducts, setLikedProducts] = useState<Set<number>>(new Set());
  const [shareCounts, setShareCounts] = useState<Record<number, number>>({});
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [stories, setStories] = useState<Array<{
    id: number;
    userId: number;
    username: string;
    avatar?: string;
    videoUrl: string;
    duration: number;
    hasStory: boolean;
    isViewed: boolean;
    viewCount: number;
  }>>([]);

  const handleProductClick = (productId: number) => {
    router.push(`/product/${productId}`);
  };

  const handleLike = async (productId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!user) {
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
    }
  };

  const handleComment = (productId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      toast({ title: "Login required", description: "Please login to comment." });
      return;
    }
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
      addToLocalCart(productId);
      toast({ title: "Added to cart", description: "Product added to your cart." });
      return;
    }

    try {
      const cartItem = await addToCartAPI(user.id, productId);
      addToCartStore(cartItem);
      toast({ title: "Added to cart", description: "Product added to your cart." });
    } catch (error) {
      console.error('Failed to add to cart:', error);
      addToLocalCart(productId);
      toast({ title: "Added to cart", description: "Product added to your cart." });
    }
  };

  const handleAddToWishlist = async (productId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!user) {
      addToLocalWishlist(productId);
      toast({ title: "Added to wishlist", description: "Product added to your wishlist." });
      return;
    }

    try {
      const wishlistItem = await addToWishlistAPI(user.id, productId);
      addToWishlistStore(wishlistItem);
      toast({ title: "Added to wishlist", description: "Product added to your wishlist." });
    } catch (error) {
      console.error('Failed to add to wishlist:', error);
      addToLocalWishlist(productId);
      toast({ title: "Added to wishlist", description: "Product added to your wishlist." });
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setProductsLoading(true);
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
        
        // Fetch like counts for all products
        const likeCountPromises = fetchedProducts.map(product => 
          getLikeCounts(product.id).catch(() => ({ likes: 0, dislikes: 0 }))
        );
        const likeCountResults = await Promise.all(likeCountPromises);
        const likeCountsMap: Record<number, any> = {};
        fetchedProducts.forEach((product, index) => {
          likeCountsMap[product.id] = likeCountResults[index];
        });
        setLikeCounts(likeCountsMap);
        
        // Fetch comment counts
        const commentCountPromises = fetchedProducts.map(product => 
          getComments(product.id).catch(() => [])
        );
        const commentResults = await Promise.all(commentCountPromises);
        const commentCountsMap: Record<number, number> = {};
        fetchedProducts.forEach((product, index) => {
          commentCountsMap[product.id] = commentResults[index].length;
        });
        setCommentCounts(commentCountsMap);
        
      } catch (error) {
        console.error('Error fetching products:', error);
        setProductsError('Failed to load products. Please try again later.');
      } finally {
        setProductsLoading(false);
      }
    };

    fetchProducts();

    // Load sample stories data with video content
    const sampleStories = [
      { 
        id: 1, 
        userId: 1, 
        username: "Sarah", 
        videoUrl: "/api/media/422736c3-1ca6-4739-9573-6ccd52d90a12.mp4",
        duration: 45,
        hasStory: true, 
        isViewed: false,
        viewCount: 128
      },
      { 
        id: 2, 
        userId: 2, 
        username: "Mike", 
        videoUrl: "/api/media/41648673-4d09-46f8-87fc-f0d32d8484d2.mp4",
        duration: 32,
        hasStory: true, 
        isViewed: true,
        viewCount: 89
      },
      { 
        id: 3, 
        userId: 3, 
        username: "Emma", 
        videoUrl: "/api/media/9a5d0667-25bd-4308-ad33-28642e48fc18.mp4",
        duration: 58,
        hasStory: true, 
        isViewed: false,
        viewCount: 156
      },
      { 
        id: 4, 
        userId: 4, 
        username: "John", 
        videoUrl: "/api/media/da9949e8-6836-4c16-b684-fd405e76c04d.mp4",
        duration: 41,
        hasStory: true, 
        isViewed: false,
        viewCount: 203
      },
      { 
        id: 5, 
        userId: 5, 
        username: "Lisa", 
        videoUrl: "/api/media/49cfd0b6-67ee-4e91-81e9-86efaf9934bf.mp4",
        duration: 55,
        hasStory: true, 
        isViewed: true,
        viewCount: 67
      },
      { 
        id: 6, 
        userId: 6, 
        username: "David", 
        videoUrl: "/api/media/9de65e59-8f9b-4bdf-95b3-29efdc7b2a11.mp4",
        duration: 38,
        hasStory: true, 
        isViewed: false,
        viewCount: 142
      },
      { 
        id: 7, 
        userId: 7, 
        username: "Anna", 
        videoUrl: "/api/media/1104a9ec-1a61-4d9c-8b09-d8d3e5763c4d.mp4",
        duration: 47,
        hasStory: true, 
        isViewed: false,
        viewCount: 178
      },
    ];
    setStories(sampleStories);
  }, []);

  useEffect(() => {
    loadLocalCart();
    loadLocalWishlist();
  }, [loadLocalCart, loadLocalWishlist]);

  const getTotalLikeCount = (productId: number) => {
    return likeCounts[productId]?.likes || 0;
  };

  const isInCart = (productId: number) => {
    return isInLocalCart(productId) || cartItems.some(item => item.productId === productId);
  };

  const isInWishlist = (productId: number) => {
    return isInLocalWishlist(productId) || wishlistItems.some(item => item.productId === productId);
  };

  const handleStoryClick = (storyId: number) => {
    // Mark story as viewed
    setStories(prev => prev.map(story => 
      story.id === storyId ? { ...story, isViewed: true } : story
    ));
    // TODO: Navigate to story viewer
    toast({ title: "Story Viewer", description: "Story viewer coming soon!" });
  };

  const handleAddStory = () => {
    if (!user) {
      toast({ title: "Login required", description: "Please login to add a story." });
      return;
    }
    // TODO: Navigate to story creation
    toast({ title: "Add Story", description: "Story creation coming soon!" });
  };

  // Filter products by category
  const featuredProducts = products.slice(0, 8);
  const trendingProducts = products.filter(p => p.likeCount > 5).slice(0, 8);
  const newArrivals = products.slice(-8).reverse();

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <HeroSection />

      {/* Stories Section */}
      <StoriesSection 
        stories={stories}
        onStoryClick={handleStoryClick}
        onAddStory={handleAddStory}
      />

      {/* Featured Products */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-indigo-600" />
            <h2 className="heading-2">Featured Products</h2>
          </div>
          <Button variant="outline" onClick={() => router.push('/products')}>
            View All
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

        {productsLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onLike={handleLike}
                onComment={handleComment}
                onShare={handleShare}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
                isLiked={likedProducts.has(product.id)}
                likeCount={getTotalLikeCount(product.id)}
                commentCount={commentCounts[product.id] || 0}
                shareCount={shareCounts[product.id] || 0}
                isInCart={isInCart(product.id)}
                isInWishlist={isInWishlist(product.id)}
                onProductClick={handleProductClick}
              />
            ))}
          </div>
        )}
      </section>

      {/* Trending Products */}
      {trendingProducts.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-6 w-6 text-orange-600" />
              <h2 className="heading-2">Trending Now</h2>
            </div>
            <Button variant="outline" onClick={() => router.push('/trending')}>
              View All
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {trendingProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onLike={handleLike}
                onComment={handleComment}
                onShare={handleShare}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
                isLiked={likedProducts.has(product.id)}
                likeCount={getTotalLikeCount(product.id)}
                commentCount={commentCounts[product.id] || 0}
                shareCount={shareCounts[product.id] || 0}
                isInCart={isInCart(product.id)}
                isInWishlist={isInWishlist(product.id)}
                onProductClick={handleProductClick}
              />
            ))}
          </div>
        </section>
      )}

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="h-6 w-6 text-green-600" />
              <h2 className="heading-2">New Arrivals</h2>
            </div>
            <Button variant="outline" onClick={() => router.push('/new-arrivals')}>
              View All
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onLike={handleLike}
                onComment={handleComment}
                onShare={handleShare}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
                isLiked={likedProducts.has(product.id)}
                likeCount={getTotalLikeCount(product.id)}
                commentCount={commentCounts[product.id] || 0}
                shareCount={shareCounts[product.id] || 0}
                isInCart={isInCart(product.id)}
                isInWishlist={isInWishlist(product.id)}
                onProductClick={handleProductClick}
              />
            ))}
          </div>
        </section>
      )}

      {/* Error State */}
      {productsError && (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Unable to Load Products</h3>
            <p className="text-gray-600 mb-4">{productsError}</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}