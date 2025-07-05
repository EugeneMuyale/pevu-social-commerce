import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../store/auth';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

// Product categories with subcategories
export const categories = {
  'Phones and Tablets': [
    'MOBILE PHONES',
    'ACCESSORIES',
    'TABLETS'
  ],
  'TVs and Audio': [
    'TELEVISIONS',
    'HOME AUDIO',
    'ACCESSORIES and SUPPLIES',
    'BRAND'
  ],
  'Health and Beauty': [
    'FACIAL SKIN CARE',
    'HAIR CARE',
    'MAKEUP',
    'HEALTH and WELLNESS',
    'PERSONAL CARE',
    'FRAGRANCES',
    'LUXURY BEAUTY'
  ],
  'Fashion': [
    "MEN'S CLOTHING",
    "MEN'S SHOES",
    "MEN'S ACCESSORIES",
    "WOMEN'S CLOTHING",
    "WOMEN'S ACCESSORIES",
    "WOMEN'S SHOES",
    "KID'S FASHION",
    'BRAND'
  ],
  'Computing': [
    'LAPTOPS',
    'COMPUTERS and ACCESSORIES',
    'COMPUTER DATA STORAGE',
    'COMPUTER COMPONENTS',
    'BRANDS'
  ]
};

// Brand subcategories for different main categories
const brandSubcategories: Record<string, string[]> = {
  'Phones and Tablets - MOBILE PHONES': [
    'Samsung',
    'Techno',
    'Xiaomi',
    'Infinix',
    'Vivo',
    'Oppo'
  ],
  'Phones and Tablets - TABLETS': [
    'Samsung',
    'Techno',
    'Xiaomi',
    'Infinix',
    'Vivo',
    'Oppo'
  ],
  'Phones and Tablets - ACCESSORIES': [
    'Samsung',
    'Techno',
    'Xiaomi',
    'Infinix',
    'Vivo',
    'Oppo'
  ],
  'TVs and Audio - TELEVISIONS': [
    'Vitron',
    'Hikers',
    'Skyworth',
    'Vision Plus',
    'Hisense TV',
    'Amtec',
    'TCL TV',
    'Royal',
    'GLD'
  ],
  'TVs and Audio - HOME AUDIO': [
    'Vitron',
    'Hikers',
    'Skyworth',
    'Vision Plus',
    'Hisense TV',
    'Amtec',
    'TCL TV',
    'Royal',
    'GLD'
  ],
  'TVs and Audio - ACCESSORIES and SUPPLIES': [
    'Vitron',
    'Hikers',
    'Skyworth',
    'Vision Plus',
    'Hisense TV',
    'Amtec',
    'TCL TV',
    'Royal',
    'GLD'
  ],
  'TVs and Audio - BRAND': [
    'Vitron',
    'Hikers',
    'Skyworth',
    'Vision Plus',
    'Hisense TV',
    'Amtec',
    'TCL TV',
    'Royal',
    'GLD'
  ],
  'Fashion - MEN\'S CLOTHING': [
    'Adidas',
    'Levi\'s',
    'Curren',
    'Forever Young',
    'Bata',
    'Reebok'
  ],
  'Fashion - MEN\'S SHOES': [
    'Adidas',
    'Levi\'s',
    'Curren',
    'Forever Young',
    'Bata',
    'Reebok'
  ],
  'Fashion - MEN\'S ACCESSORIES': [
    'Adidas',
    'Levi\'s',
    'Curren',
    'Forever Young',
    'Bata',
    'Reebok'
  ],
  'Fashion - WOMEN\'S CLOTHING': [
    'Adidas',
    'Levi\'s',
    'Curren',
    'Forever Young',
    'Bata',
    'Reebok'
  ],
  'Fashion - WOMEN\'S ACCESSORIES': [
    'Adidas',
    'Levi\'s',
    'Curren',
    'Forever Young',
    'Bata',
    'Reebok'
  ],
  'Fashion - WOMEN\'S SHOES': [
    'Adidas',
    'Levi\'s',
    'Curren',
    'Forever Young',
    'Bata',
    'Reebok'
  ],
  'Fashion - KID\'S FASHION': [
    'Adidas',
    'Levi\'s',
    'Curren',
    'Forever Young',
    'Bata',
    'Reebok'
  ],
  'Fashion - BRAND': [
    'Adidas',
    'Levi\'s',
    'Curren',
    'Forever Young',
    'Bata',
    'Reebok'
  ],
  'Computing - LAPTOPS': [
    'HP Laptops',
    'Dell Laptops',
    'Lenovo Laptops',
    'Apple Laptops',
    'Asus Laptops'
  ],
  'Computing - COMPUTERS and ACCESSORIES': [
    'HP Laptops',
    'Dell Laptops',
    'Lenovo Laptops',
    'Apple Laptops',
    'Asus Laptops'
  ],
  'Computing - COMPUTER DATA STORAGE': [
    'HP Laptops',
    'Dell Laptops',
    'Lenovo Laptops',
    'Apple Laptops',
    'Asus Laptops'
  ],
  'Computing - COMPUTER COMPONENTS': [
    'HP Laptops',
    'Dell Laptops',
    'Lenovo Laptops',
    'Apple Laptops',
    'Asus Laptops'
  ],
  'Computing - BRANDS': [
    'HP Laptops',
    'Dell Laptops',
    'Lenovo Laptops',
    'Apple Laptops',
    'Asus Laptops'
  ]
};

export default function AuthNav({ side }: { side: 'left' | 'right' }) {
  const user = useAuth((s) => s.user);
  const profile = useAuth((s) => s.profile);
  const logout = useAuth((s) => s.logout);
  const [open, setOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [selectedBrandCategory, setSelectedBrandCategory] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  useEffect(() => {
    if (!categoriesOpen) return;
    function handleClick(e: MouseEvent) {
      if (categoriesRef.current && !categoriesRef.current.contains(e.target as Node)) {
        setCategoriesOpen(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setCategoriesOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [categoriesOpen]);

  if (side === 'left') {
    return (
      <div className="flex items-center space-x-4">
        <div className="relative" ref={categoriesRef}>
          <button
            onClick={() => setCategoriesOpen(!categoriesOpen)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setCategoriesOpen(!categoriesOpen);
              }
            }}
            className="flex items-center space-x-2 text-gray-800 hover:text-gray-600 transition-colors"
            aria-expanded={categoriesOpen}
            aria-haspopup="true"
          >
            <div className="w-5 h-4 border border-gray-800 rounded flex flex-col justify-center items-center">
              <div className="w-3 h-0.5 bg-gray-800 mb-0.5"></div>
              <div className="w-3 h-0.5 bg-gray-800 mb-0.5"></div>
              <div className="w-3 h-0.5 bg-gray-800"></div>
            </div>
            <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-wide">Pevu</span>
          </button>
          
          {categoriesOpen && (
            <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {selectedBrandCategory ? 'Brand Options' : 'Product Categories'}
                </h3>
                {selectedBrandCategory && (
                  <button
                    onClick={() => setSelectedBrandCategory(null)}
                    className="mb-3 text-sm text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    ← Back to Categories
                  </button>
                )}
                <div className="space-y-3">
                  {selectedBrandCategory ? (
                    // Show brand subcategories
                    <div className="grid grid-cols-2 gap-1">
                      {brandSubcategories[selectedBrandCategory]?.map((brand) => (
                        <Link
                          key={brand}
                          href={`/?category=${encodeURIComponent(selectedBrandCategory + ' - ' + brand)}`}
                          className="text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
                          onClick={() => {
                            setCategoriesOpen(false);
                            setSelectedBrandCategory(null);
                          }}
                        >
                          {brand}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    // Show main categories
                    Object.entries(categories).map(([mainCategory, subcategories]) => (
                      <div key={mainCategory} className="border-b border-gray-100 pb-3 last:border-b-0">
                        <h4 className="font-medium text-gray-900 mb-2">{mainCategory}</h4>
                        <div className="grid grid-cols-2 gap-1">
                          {subcategories.map((subcategory) => {
                            const categoryKey = `${mainCategory} - ${subcategory}`;
                            const hasBrandSubcategories = brandSubcategories[categoryKey];
                            
                            return hasBrandSubcategories ? (
                              <button
                                key={subcategory}
                                onClick={() => setSelectedBrandCategory(categoryKey)}
                                className="text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors text-left"
                              >
                                {subcategory}
                              </button>
                            ) : (
                              <Link
                                key={subcategory}
                                href={`/?category=${encodeURIComponent(categoryKey)}`}
                                className="text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
                                onClick={() => setCategoriesOpen(false)}
                              >
                                {subcategory}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // right side: account dropdown or user info
  if (!user) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          className="flex items-center space-x-1 text-gray-800 hover:text-gray-600 transition-colors"
          onClick={() => setOpen((o) => !o)}
          aria-label="Account"
        >
          <div className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300">
            <Avatar>
              <AvatarFallback>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <circle cx="12" cy="7" r="4" />
                  <path d="M5.5 21a7.5 7.5 0 0 1 13 0" />
                </svg>
              </AvatarFallback>
            </Avatar>
          </div>
          <span className="text-sm font-medium">Account</span>
        </button>
        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
            <Link href="/login" className="block px-4 py-2 hover:bg-gray-100 text-gray-700">Login</Link>
            <Link href="/signup" className="block px-4 py-2 hover:bg-gray-100 text-gray-700">Sign up</Link>
          </div>
        )}
      </div>
    );
  }

  // Logged in: show avatar and dropdown
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center space-x-1 text-gray-800 hover:text-gray-600 transition-colors"
        onClick={() => setOpen((o) => !o)}
        aria-label="Account"
      >
        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300">
          <Avatar>
            {profile?.avatarUrl ? (
              <AvatarImage src={profile.avatarUrl} alt={profile.fullName || user.name} />
            ) : (
              <AvatarFallback>{(profile?.fullName || user.name || 'U')[0]}</AvatarFallback>
            )}
          </Avatar>
        </div>
        <span className="text-sm font-medium">Account</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
          <div className="px-4 py-2 border-b text-sm text-gray-700">
            <div className="font-semibold">{profile?.fullName || user.name}</div>
            <div className="text-xs text-gray-500">{user.email}</div>
            <div className="text-xs text-gray-500 capitalize">{user.role.toLowerCase()}</div>
          </div>
          {user.role === 'SELLER' && (
            <Link href="/seller/dashboard" className="block px-4 py-2 hover:bg-gray-100 text-gray-700">
              Seller Dashboard
            </Link>
          )}
          <button
            onClick={logout}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
} 