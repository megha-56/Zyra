'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';

export default function WishlistPage() {
  const router = useRouter();
  const [wishlist, setWishlist] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const response = await fetch('/api/wishlist');
      if (response.status === 401) {
        router.push('/login');
        return;
      }
      const data = await response.json();
      setWishlist(data.wishlist);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading wishlist...</p>
      </div>
    );
  }

  if (!wishlist || !wishlist.products || wishlist.products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Your Wishlist is Empty</h1>
          <p className="text-gray-600 mb-8">Save your favorite items here!</p>
          <Link href="/category/men">
            <button className="px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
              Start Shopping
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">My Wishlist</h1>
          <p className="text-gray-600">{wishlist.products.length} items saved</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.products.map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}