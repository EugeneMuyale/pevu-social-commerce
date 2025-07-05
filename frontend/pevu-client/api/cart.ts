import api from './axios';

export type CartItem = {
  id: number;
  productId: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
};

export type WishlistItem = {
  id: number;
  productId: number;
  createdAt: string;
  updatedAt: string;
};

export async function getCart(userId: number): Promise<CartItem[]> {
  const res = await api.get<CartItem[]>(`/cart/${userId}`);
  return res.data;
}

export async function addToCart(userId: number, productId: number, quantity = 1): Promise<CartItem> {
  const res = await api.post<CartItem>(`/cart/${userId}`, { productId, quantity });
  return res.data;
}

export async function updateCartItem(userId: number, productId: number, quantity: number): Promise<CartItem> {
  const res = await api.put<CartItem>(`/cart/${userId}/${productId}?quantity=${quantity}`);
  return res.data;
}

export async function removeFromCart(userId: number, productId: number): Promise<void> {
  await api.delete(`/cart/${userId}/${productId}`);
}

export async function clearCart(userId: number): Promise<void> {
  await api.delete(`/cart/${userId}`);
}

export async function getWishlist(userId: number): Promise<WishlistItem[]> {
  const res = await api.get<WishlistItem[]>(`/wishlist/${userId}`);
  return res.data;
}

export async function addToWishlist(userId: number, productId: number): Promise<WishlistItem> {
  const res = await api.post<WishlistItem>(`/wishlist/${userId}`, { productId });
  return res.data;
}

export async function removeFromWishlist(userId: number, productId: number): Promise<void> {
  await api.delete(`/wishlist/${userId}/${productId}`);
} 