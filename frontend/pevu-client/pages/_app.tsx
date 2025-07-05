import '../styles/globals.css'
import type { AppProps } from 'next/app'
import AuthNav from '../components/AuthNav'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import NotificationBell from '../components/NotificationBell'
import { ToastProvider } from '../hooks/use-toast'
import SearchBar from '../components/SearchBar'
import SearchIcon from '../components/SearchIcon'
import CartIcon from '../components/CartIcon'
import { useAuth } from '../store/auth'
import { getProfile } from '../api/profile'
import ProtectedRoute from '../components/ProtectedRoute'

const queryClient = new QueryClient()

function AppContent({ Component, pageProps, router }: AppProps) {
  const { user, setProfile } = useAuth();
  
  useEffect(() => {
    console.log('Auth effect: user =', user);
    if (user) {
      getProfile(user.id)
        .then((profile) => {
          console.log('Fetched profile:', profile);
          setProfile(profile);
        })
        .catch((err) => {
          console.error('Failed to fetch profile:', err);
          setProfile(null);
        });
    }
  }, [user, setProfile]);

  // Check if current page is login or register (public pages)
  const isPublicPage = router.pathname === '/login' || router.pathname === '/register';
  
  // If it's a public page, render without protection
  if (isPublicPage) {
    return <Component {...pageProps} router={router} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Professional Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="container-responsive">
          <div className="flex items-center justify-between h-16">
            {/* Left: Logo/Brand */}
            <div className="flex items-center flex-shrink-0">
              <AuthNav side="left" />
            </div>
            
            {/* Center: Search Bar */}
            <div className="flex-1 flex justify-center px-4 max-w-2xl mx-auto">
              <div className="relative w-full max-w-md">
                <SearchBar />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <SearchIcon />
                </div>
              </div>
            </div>
            
            {/* Right: Navigation Items */}
            <div className="flex items-center space-x-4 flex-shrink-0">
              <AuthNav side="right" />
              <div className="flex items-center space-x-2">
                <CartIcon />
                <NotificationBell />
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container-responsive py-6">
        <ProtectedRoute>
          <Component {...pageProps} router={router} />
        </ProtectedRoute>
      </main>
      
      {/* Professional Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="container-responsive py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pevu</h3>
              <p className="text-gray-600 text-sm">
                Your trusted social commerce platform for discovering and sharing amazing products.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Shop</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900 transition-colors">All Products</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Categories</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Deals</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">New Arrivals</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Shipping Info</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-500">
            <p>&copy; 2024 Pevu. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <AppContent Component={Component} pageProps={pageProps} router={router} />
      </ToastProvider>
    </QueryClientProvider>
  )
} 