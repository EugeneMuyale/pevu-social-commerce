// Utility to manage likes for logged-out users using localStorage

const LIKES_STORAGE_KEY = 'pevu_likes';
const LIKE_COUNTS_STORAGE_KEY = 'pevu_like_counts';

export interface StoredLike {
  productId: number;
  timestamp: number;
}

export interface StoredLikeCount {
  productId: number;
  likes: number;
  dislikes: number;
  timestamp: number;
}

// Get likes from localStorage
export const getStoredLikes = (): Set<number> => {
  if (typeof window === 'undefined') return new Set();
  
  try {
    const stored = localStorage.getItem(LIKES_STORAGE_KEY);
    if (!stored) return new Set();
    
    const likes: StoredLike[] = JSON.parse(stored);
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    
    // Filter out likes older than 24 hours
    const validLikes = likes.filter(like => (now - like.timestamp) < oneDay);
    
    // Update localStorage with valid likes
    localStorage.setItem(LIKES_STORAGE_KEY, JSON.stringify(validLikes));
    
    return new Set(validLikes.map(like => like.productId));
  } catch (error) {
    console.log('Error reading likes from localStorage:', error);
    return new Set();
  }
};

// Add like to localStorage
export const addStoredLike = (productId: number): void => {
  if (typeof window === 'undefined') return;
  
  try {
    const likes = getStoredLikes();
    likes.add(productId);
    
    const storedLikes: StoredLike[] = Array.from(likes).map(id => ({
      productId: id,
      timestamp: Date.now()
    }));
    
    localStorage.setItem(LIKES_STORAGE_KEY, JSON.stringify(storedLikes));
  } catch (error) {
    console.log('Error adding like to localStorage:', error);
  }
};

// Remove like from localStorage
export const removeStoredLike = (productId: number): void => {
  if (typeof window === 'undefined') return;
  
  try {
    const likes = getStoredLikes();
    likes.delete(productId);
    
    const storedLikes: StoredLike[] = Array.from(likes).map(id => ({
      productId: id,
      timestamp: Date.now()
    }));
    
    localStorage.setItem(LIKES_STORAGE_KEY, JSON.stringify(storedLikes));
  } catch (error) {
    console.log('Error removing like from localStorage:', error);
  }
};

// Get like counts from localStorage
export const getStoredLikeCounts = (): Record<number, StoredLikeCount> => {
  if (typeof window === 'undefined') return {};
  
  try {
    const stored = localStorage.getItem(LIKE_COUNTS_STORAGE_KEY);
    if (!stored) return {};
    
    const counts: StoredLikeCount[] = JSON.parse(stored);
    const now = Date.now();
    const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
    
    // Filter out counts older than 1 hour
    const validCounts = counts.filter(count => (now - count.timestamp) < oneHour);
    
    // Update localStorage with valid counts
    localStorage.setItem(LIKE_COUNTS_STORAGE_KEY, JSON.stringify(validCounts));
    
    return validCounts.reduce((acc, count) => {
      acc[count.productId] = count;
      return acc;
    }, {} as Record<number, StoredLikeCount>);
  } catch (error) {
    console.log('Error reading like counts from localStorage:', error);
    return {};
  }
};

// Store like count in localStorage
export const storeLikeCount = (productId: number, likes: number, dislikes: number): void => {
  if (typeof window === 'undefined') return;
  
  try {
    const counts = getStoredLikeCounts();
    counts[productId] = {
      productId,
      likes,
      dislikes,
      timestamp: Date.now()
    };
    
    const storedCounts: StoredLikeCount[] = Object.values(counts);
    localStorage.setItem(LIKE_COUNTS_STORAGE_KEY, JSON.stringify(storedCounts));
  } catch (error) {
    console.log('Error storing like count in localStorage:', error);
  }
};

// Update like count for logged-out users
export const updateStoredLikeCount = (productId: number, increment: boolean): void => {
  if (typeof window === 'undefined') return;
  
  try {
    const counts = getStoredLikeCounts();
    const currentCount = counts[productId] || { productId, likes: 0, dislikes: 0, timestamp: Date.now() };
    
    if (increment) {
      currentCount.likes += 1;
    } else {
      currentCount.likes = Math.max(0, currentCount.likes - 1);
    }
    
    currentCount.timestamp = Date.now();
    counts[productId] = currentCount;
    
    const storedCounts: StoredLikeCount[] = Object.values(counts);
    localStorage.setItem(LIKE_COUNTS_STORAGE_KEY, JSON.stringify(storedCounts));
  } catch (error) {
    console.log('Error updating like count in localStorage:', error);
  }
}; 