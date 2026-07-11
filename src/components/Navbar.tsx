'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Heart, User, Search, Menu, X, LogOut, Package } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [cartCount, setCartCount] = useState(0);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user is logged in
    fetch('/api/auth/me')
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Not logged in');
      })
      .then((data) => {
        setIsLoggedIn(true);
        setUser(data.user);
        // Fetch cart count
        fetch('/api/cart')
          .then((res) => res.json())
          .then((data) => {
            if (data.cart) {
              setCartCount(data.cart.items.length);
            }
          })
          .catch(() => {});
      })
      .catch(() => {
        setIsLoggedIn(false);
        setUser(null);
      });

    // Close profile dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setIsLoggedIn(false);
      setUser(null);
      setIsProfileOpen(false);
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="ZYRA Logo" width={40} height={40} className="object-contain" />
            <span className="text-2xl font-bold tracking-tight">ZYRA</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/category/men" className="text-gray-700 hover:text-black transition-colors">
              Men
            </Link>
            <Link href="/category/women" className="text-gray-700 hover:text-black transition-colors">
              Women
            </Link>
            <Link href="/category/children" className="text-gray-700 hover:text-black transition-colors">
              Children
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                    router.push(`/search?q=${encodeURIComponent(e.currentTarget.value.trim())}`);
                  }
                }}
                className="w-full px-4 py-2 pl-10 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Link href="/wishlist" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Heart className="h-6 w-6" />
            </Link>
            <Link href="/cart" className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <User className="h-6 w-6" />
                  </button>
                  
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-200 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                      </div>
                      
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <User className="h-4 w-4 text-gray-600" />
                        <span className="text-sm text-gray-700">My Profile</span>
                      </Link>
                      
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <Package className="h-4 w-4 text-gray-600" />
                        <span className="text-sm text-gray-700">My Orders</span>
                      </Link>
                      
                      <Link
                        href="/wishlist"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <Heart className="h-4 w-4 text-gray-600" />
                        <span className="text-sm text-gray-700">Wishlist</span>
                      </Link>
                      
                      <div className="border-t border-gray-200 mt-2 pt-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors w-full text-left"
                        >
                          <LogOut className="h-4 w-4 text-red-600" />
                          <span className="text-sm text-red-600">Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href="/login"
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <User className="h-6 w-6" />
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search products..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                    router.push(`/search?q=${encodeURIComponent(e.currentTarget.value.trim())}`);
                    setIsMenuOpen(false);
                  }
                }}
                className="w-full px-4 py-2 pl-10 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <Link
              href="/category/men"
              className="block py-2 text-gray-700 hover:text-black transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Men
            </Link>
            <Link
              href="/category/women"
              className="block py-2 text-gray-700 hover:text-black transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Women
            </Link>
            <Link
              href="/category/children"
              className="block py-2 text-gray-700 hover:text-black transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Children
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}