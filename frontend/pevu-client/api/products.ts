import api from './axios';

export type Product = {
  id: number;
  title: string;
  details?: string;
  specifications?: string;
  price: number;
  category: string;
  majorCategory?: string;
  subcategory?: string;
  brand?: string;
  productQuantity: number;
  sellerId: number;
  images: string[];
  videos: string[];
  videoType?: 'REEL' | 'STORY';
  videoDuration?: number;
  attributes?: string;
  isActive: boolean;
  isApproved: boolean;
  viewCount: number;
  likeCount: number;
  purchaseCount: number;
  createdAt: string;
  updatedAt: string;
};

export type ProductCreateRequest = {
  title: string;
  details?: string;
  specifications?: string;
  price: number;
  category?: string;
  majorCategory?: string;
  subcategory?: string;
  brand?: string;
  productQuantity?: number;
  sellerId: number;
  images: string[];
  videos: string[];
  videoDuration?: number;
  attributes?: Record<string, any>;
};

export async function getProducts(): Promise<Product[]> {
  // Add timeout to prevent hanging
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
  
  try {
    const res = await api.get<Product[]>('/product', {
      signal: controller.signal,
      timeout: 10000
    });
    clearTimeout(timeoutId);
    return res.data;
  } catch (error) {
    clearTimeout(timeoutId);
    console.error('Error fetching products:', error);
    // Return empty array instead of throwing to prevent UI hanging
    return [];
  }
}

export async function getProductById(id: number): Promise<Product> {
  const res = await api.get<Product>(`/product/${id}`);
  return res.data;
}

export async function createProduct(data: ProductCreateRequest): Promise<Product> {
  const res = await api.post<Product>('/product', data);
  return res.data;
}

export async function getProductsBySeller(sellerId: number): Promise<Product[]> {
  const res = await api.get<Product[]>(`/product?sellerId=${sellerId}`);
  return res.data;
}

export async function deleteProduct(id: number): Promise<void> {
  await api.delete(`/product/${id}`);
}

export async function getAllProductsAdmin() {
  const res = await api.get('/product'); // Assumes admin can see all
  return res.data;
}

export async function approveProduct(id: number) {
  const res = await api.put(`/product/${id}/approve`);
  return res.data;
}

export async function rejectProduct(id: number) {
  const res = await api.put(`/product/${id}/reject`);
  return res.data;
}

export async function removeProduct(id: number) {
  const res = await api.put(`/product/${id}/remove`);
  return res.data;
}

export async function getProductReviews(productId: number) {
  const res = await api.get(`/review/product/${productId}`);
  return res.data;
}

export async function getProductAverageRating(productId: number) {
  const res = await api.get(`/review/product/${productId}/average`);
  return res.data;
}

export async function addReview(userId: number, productId: number, rating: number, comment: string) {
  const res = await api.post('/review', { productId, rating, comment }, { params: { userId } });
  return res.data;
}

export async function editReview(id: number, userId: number, rating: number, comment: string) {
  const res = await api.put(`/review/${id}`, { productId: 0, rating, comment }, { params: { userId } });
  return res.data;
}

export async function deleteReview(id: number, userId: number) {
  await api.delete(`/review/${id}`, { params: { userId } });
}

export async function getTrendingByViews() {
  const res = await api.get('/product/trending/views');
  return res.data;
}

export async function getTrendingByLikes() {
  const res = await api.get('/product/trending/likes');
  return res.data;
}

export async function getTrendingByPurchases() {
  const res = await api.get('/product/trending/purchases');
  return res.data;
}

export async function searchProducts({ query, category, minPrice, maxPrice, minRating }: {
  query: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
}) {
  const params: any = { query };
  if (category) params.category = category;
  if (minPrice !== undefined) params.minPrice = minPrice;
  if (maxPrice !== undefined) params.maxPrice = maxPrice;
  if (minRating !== undefined) params.minRating = minRating;
  const res = await api.get('/product/search', { params });
  return res.data;
}

export async function getProductRecommendations(productId: number): Promise<Product[]> {
  const res = await api.get<Product[]>(`/product/${productId}/recommendations`);
  return res.data;
}

export async function updateProduct(id: number, data: ProductCreateRequest): Promise<Product> {
  const res = await api.put<Product>(`/product/${id}`, data);
  return res.data;
} 