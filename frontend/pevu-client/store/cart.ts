import { create } from 'zustand';
import { 
  getStoredCartItems, 
  addStoredCartItem, 
  removeStoredCartItem, 
  updateStoredCartItem, 
  clearStoredCart,
  isProductInStoredCart,
  getStoredWishlistItems,
  addStoredWishlistItem,
  removeStoredWishlistItem,
  clearStoredWishlist,
  isProductInStoredWishlist,
  LocalCartItem,
  LocalWishlistItem
} from '../utils/cartStorage';

export type CartItem = {
  id: number;
  productId: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  // Add other fields as needed
};

export type WishlistItem = {
  id: number;
  productId: number;
  createdAt: string;
  updatedAt: string;
  // Add other fields as needed
};

type CartState = {
  cartItems: CartItem[];
  wishlistItems: WishlistItem[];
  localCartItems: LocalCartItem[];
  localWishlistItems: LocalWishlistItem[];
  cartLoading: boolean;
  wishlistLoading: boolean;
  setCartItems: (items: CartItem[]) => void;
  setWishlistItems: (items: WishlistItem[]) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: number) => void;
  updateCartItem: (productId: number, quantity: number) => void;
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (productId: number) => void;
  clearCart: () => void;
  setCartLoading: (loading: boolean) => void;
  setWishlistLoading: (loading: boolean) => void;
  // Local storage functions
  loadLocalCart: () => void;
  loadLocalWishlist: () => void;
  addToLocalCart: (productId: number, quantity?: number) => void;
  removeFromLocalCart: (productId: number) => void;
  updateLocalCartItem: (productId: number, quantity: number) => void;
  addToLocalWishlist: (productId: number) => void;
  removeFromLocalWishlist: (productId: number) => void;
  clearLocalCart: () => void;
  clearLocalWishlist: () => void;
  isInLocalCart: (productId: number) => boolean;
  isInLocalWishlist: (productId: number) => boolean;
  getTotalCartCount: () => number;
  getTotalWishlistCount: () => number;
  clearWishlist: () => void;
};

export const useCart = create<CartState>((set, get) => ({
  cartItems: [],
  wishlistItems: [],
  localCartItems: [],
  localWishlistItems: [],
  cartLoading: false,
  wishlistLoading: false,
  setCartItems: (items) => set({ cartItems: items }),
  setWishlistItems: (items) => set({ wishlistItems: items }),
  addToCart: (item) => set((state) => ({ 
    cartItems: [...state.cartItems, item] 
  })),
  removeFromCart: (productId) => set((state) => ({ 
    cartItems: state.cartItems.filter(item => item.productId !== productId) 
  })),
  updateCartItem: (productId, quantity) => set((state) => ({
    cartItems: state.cartItems.map(item => 
      item.productId === productId ? { ...item, quantity } : item
    )
  })),
  addToWishlist: (item) => set((state) => ({ 
    wishlistItems: [...state.wishlistItems, item] 
  })),
  removeFromWishlist: (productId) => set((state) => ({ 
    wishlistItems: state.wishlistItems.filter(item => item.productId !== productId) 
  })),
  clearWishlist: () => set({ wishlistItems: [] }),
  clearCart: () => set({ cartItems: [] }),
  setCartLoading: (loading) => set({ cartLoading: loading }),
  setWishlistLoading: (loading) => set({ wishlistLoading: loading }),
  
  // Local storage functions
  loadLocalCart: () => {
    const items = getStoredCartItems();
    set({ localCartItems: items });
  },
  loadLocalWishlist: () => {
    const items = getStoredWishlistItems();
    set({ localWishlistItems: items });
  },
  addToLocalCart: (productId, quantity = 1) => {
    addStoredCartItem(productId, quantity);
    const items = getStoredCartItems();
    set({ localCartItems: items });
  },
  removeFromLocalCart: (productId) => {
    removeStoredCartItem(productId);
    const items = getStoredCartItems();
    set({ localCartItems: items });
  },
  updateLocalCartItem: (productId, quantity) => {
    updateStoredCartItem(productId, quantity);
    const items = getStoredCartItems();
    set({ localCartItems: items });
  },
  addToLocalWishlist: (productId) => {
    addStoredWishlistItem(productId);
    const items = getStoredWishlistItems();
    set({ localWishlistItems: items });
  },
  removeFromLocalWishlist: (productId) => {
    removeStoredWishlistItem(productId);
    const items = getStoredWishlistItems();
    set({ localWishlistItems: items });
  },
  clearLocalCart: () => {
    clearStoredCart();
    set({ localCartItems: [] });
  },
  clearLocalWishlist: () => {
    clearStoredWishlist();
    set({ localWishlistItems: [] });
  },
  isInLocalCart: (productId) => {
    return isProductInStoredCart(productId);
  },
  isInLocalWishlist: (productId) => {
    return isProductInStoredWishlist(productId);
  },
  getTotalCartCount: () => {
    const state = get();
    const serverCount = state.cartItems.length;
    const localCount = state.localCartItems.length;
    return serverCount + localCount;
  },
  getTotalWishlistCount: () => {
    const state = get();
    const serverCount = state.wishlistItems.length;
    const localCount = state.localWishlistItems.length;
    return serverCount + localCount;
  },
})); 