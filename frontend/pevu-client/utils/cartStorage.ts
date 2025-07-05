// Cart and Wishlist localStorage utilities for non-logged-in users

export interface LocalCartItem {
  productId: number;
  quantity: number;
  addedAt: string;
}

export interface LocalWishlistItem {
  productId: number;
  addedAt: string;
}

const CART_STORAGE_KEY = 'pevu_cart_items';
const WISHLIST_STORAGE_KEY = 'pevu_wishlist_items';

// Cart functions
export const getStoredCartItems = (): LocalCartItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to get stored cart items:', error);
    return [];
  }
};

export const addStoredCartItem = (productId: number, quantity: number = 1): void => {
  if (typeof window === 'undefined') return;
  try {
    const items = getStoredCartItems();
    const existingIndex = items.findIndex(item => item.productId === productId);
    
    if (existingIndex >= 0) {
      // Update existing item quantity
      items[existingIndex].quantity += quantity;
    } else {
      // Add new item
      items.push({
        productId,
        quantity,
        addedAt: new Date().toISOString()
      });
    }
    
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Failed to add stored cart item:', error);
  }
};

export const updateStoredCartItem = (productId: number, quantity: number): void => {
  if (typeof window === 'undefined') return;
  try {
    const items = getStoredCartItems();
    const existingIndex = items.findIndex(item => item.productId === productId);
    
    if (existingIndex >= 0) {
      if (quantity <= 0) {
        // Remove item if quantity is 0 or negative
        items.splice(existingIndex, 1);
      } else {
        // Update quantity
        items[existingIndex].quantity = quantity;
      }
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  } catch (error) {
    console.error('Failed to update stored cart item:', error);
  }
};

export const removeStoredCartItem = (productId: number): void => {
  if (typeof window === 'undefined') return;
  try {
    const items = getStoredCartItems();
    const filteredItems = items.filter(item => item.productId !== productId);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(filteredItems));
  } catch (error) {
    console.error('Failed to remove stored cart item:', error);
  }
};

export const clearStoredCart = (): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(CART_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear stored cart:', error);
  }
};

export const isProductInStoredCart = (productId: number): boolean => {
  const items = getStoredCartItems();
  return items.some(item => item.productId === productId);
};

// Wishlist functions
export const getStoredWishlistItems = (): LocalWishlistItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to get stored wishlist items:', error);
    return [];
  }
};

export const addStoredWishlistItem = (productId: number): void => {
  if (typeof window === 'undefined') return;
  try {
    const items = getStoredWishlistItems();
    const existing = items.find(item => item.productId === productId);
    
    if (!existing) {
      items.push({
        productId,
        addedAt: new Date().toISOString()
      });
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
    }
  } catch (error) {
    console.error('Failed to add stored wishlist item:', error);
  }
};

export const removeStoredWishlistItem = (productId: number): void => {
  if (typeof window === 'undefined') return;
  try {
    const items = getStoredWishlistItems();
    const filteredItems = items.filter(item => item.productId !== productId);
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(filteredItems));
  } catch (error) {
    console.error('Failed to remove stored wishlist item:', error);
  }
};

export const clearStoredWishlist = (): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(WISHLIST_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear stored wishlist:', error);
  }
};

export const isProductInStoredWishlist = (productId: number): boolean => {
  const items = getStoredWishlistItems();
  return items.some(item => item.productId === productId);
}; 