'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useState } from 'react';

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    price: number;
    images: string[];
    category: string;
    gender: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isInWishlist, setIsInWishlist] = useState(false);

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/wishlist', {
        method: isInWishlist ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product._id }),
      });

      if (response.ok) {
        setIsInWishlist(!isInWishlist);
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
    }
  };

  return (
    <Link href={`/product/${product._id}`}>
      <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={product.images[0] || '/placeholder-product.jpg'}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <button
            onClick={handleWishlistToggle}
            className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors z-10"
          >
            <Heart
              className={`h-5 w-5 ${
                isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-700'
              }`}
            />
          </button>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 line-clamp-1">{product.name}</h3>
          <p className="text-sm text-gray-500 mb-2">
            {product.category} • {product.gender}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold">₹{product.price.toFixed(2)}</p>
            <button className="px-4 py-2 bg-black text-white text-sm rounded-full hover:bg-gray-800 transition-colors">
              View
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}