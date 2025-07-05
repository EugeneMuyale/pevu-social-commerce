import React from 'react';
import { Heart, MessageCircle, Share, ShoppingCart, Eye, Star } from 'lucide-react';
import { Card, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import ProductMedia from './ProductMedia';
import { Product } from '../api/products';

interface ProductCardProps {
  product: Product;
  onLike: (productId: number, e: React.MouseEvent) => void;
  onComment: (productId: number, e: React.MouseEvent) => void;
  onShare: (productId: number, e: React.MouseEvent) => void;
  onAddToCart: (productId: number, e: React.MouseEvent) => void;
  onAddToWishlist: (productId: number, e: React.MouseEvent) => void;
  isLiked: boolean;
  likeCount: number;
  commentCount: number;
  shareCount: number;
  isInCart: boolean;
  isInWishlist: boolean;
  onProductClick: (productId: number) => void;
}

export default function ProductCard({
  product,
  onLike,
  onComment,
  onShare,
  onAddToCart,
  onAddToWishlist,
  isLiked,
  likeCount,
  commentCount,
  shareCount,
  isInCart,
  isInWishlist,
  onProductClick
}: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
    }).format(price);
  };

  return (
    <Card className="group card-hover overflow-hidden bg-white">
      {/* Product Media */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <div 
          className="absolute inset-0 cursor-pointer"
          onClick={() => onProductClick(product.id)}
        >
          <ProductMedia 
            images={product.images}
            videos={product.videos}
            title={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        {/* Overlay with quick actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300">
          <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/90 hover:bg-white shadow-sm"
              onClick={(e) => onAddToWishlist(product.id, e)}
            >
              <Heart 
                className={`h-4 w-4 ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/90 hover:bg-white shadow-sm"
              onClick={(e) => onAddToCart(product.id, e)}
            >
              <ShoppingCart 
                className={`h-4 w-4 ${isInCart ? 'fill-indigo-500 text-indigo-500' : 'text-gray-600'}`} 
              />
            </Button>
          </div>
        </div>

        {/* View Details Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            variant="primary"
            size="sm"
            className="shadow-lg"
            onClick={() => onProductClick(product.id)}
          >
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <CardContent className="p-4">
        {/* Seller Info */}
        <div className="flex items-center space-x-2 mb-3">
          <Avatar className="h-6 w-6">
            <AvatarFallback className="text-xs">
              {product.brand?.charAt(0).toUpperCase() || 'S'}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-gray-600 font-medium">
            {product.brand || 'Unknown Brand'}
          </span>
        </div>

        {/* Product Title */}
        <h3 
          className="font-semibold text-gray-900 mb-2 line-clamp-2 cursor-pointer hover:text-indigo-600 transition-colors"
          onClick={() => onProductClick(product.id)}
        >
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center space-x-1 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < (product.likeCount || 0) 
                    ? 'fill-yellow-400 text-yellow-400' 
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">
            ({product.likeCount || 0})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {product.details || product.specifications || 'No description available'}
        </p>

        {/* Category */}
        {product.category && (
          <div className="flex flex-wrap gap-1 mb-3">
            <Badge className="text-xs bg-indigo-100 text-indigo-800">
              {product.category}
            </Badge>
            {product.subcategory && (
              <Badge className="text-xs bg-gray-100 text-gray-800">
                {product.subcategory}
              </Badge>
            )}
          </div>
        )}
      </CardContent>

      {/* Social Actions */}
      <CardFooter className="px-4 pb-4 pt-0">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-4">
            {/* Like Button */}
            <button
              onClick={(e) => onLike(product.id, e)}
              className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors"
            >
              <Heart 
                className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} 
              />
              <span className="text-xs">{likeCount}</span>
            </button>

            {/* Comment Button */}
            <button
              onClick={(e) => onComment(product.id, e)}
              className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="text-xs">{commentCount}</span>
            </button>

            {/* Share Button */}
            <button
              onClick={(e) => onShare(product.id, e)}
              className="flex items-center space-x-1 text-gray-600 hover:text-green-500 transition-colors"
            >
              <Share className="h-4 w-4" />
              <span className="text-xs">{shareCount}</span>
            </button>
          </div>

          {/* Quick Add to Cart */}
          <Button
            variant="primary"
            size="sm"
            onClick={(e) => onAddToCart(product.id, e)}
            className="flex items-center space-x-1"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Add</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
} 