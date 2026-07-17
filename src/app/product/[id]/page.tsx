'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Button from '@/components/Button';
import { Heart, ShoppingCart, Minus, Plus } from 'lucide-react';
import { use } from 'react';
import { toast } from 'sonner';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${id}`);
      const data = await response.json();
      if (data.product) {
        setProduct(data.product);
        setSelectedSize(data.product.sizes[0]);
        setSelectedColor(data.product.colors[0]);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product:', error);
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product._id,
          quantity,
          size: selectedSize,
          color: selectedColor,
        }),
      });

      if (response.ok) {
        setIsAddedToCart(true);
        toast.success('Added to cart!');
        setTimeout(() => setIsAddedToCart(false), 3000);
        router.refresh();
      } else {
        const data = await response.json();
        if (response.status === 401) {
          router.push('/login');
        } else {
          toast.error(data.error || 'Failed to add to cart');
        }
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('An error occurred');
    }
  };

  const handleAddToWishlist = async () => {
    try {
      const response = await fetch('/api/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product._id }),
      });

      if (response.ok) {
        toast.success('Added to wishlist!');
      } else {
        const data = await response.json();
        if (response.status === 401) {
          router.push('/login');
        } else {
          toast.error(data.error || 'Failed to add to wishlist');
        }
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      toast.error('An error occurred');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <div className="aspect-square mb-4 rounded-2xl overflow-hidden bg-gray-100">
              <Image
                src={product.images[activeImage] || '/placeholder-product.jpg'}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`aspect-square rounded-xl overflow-hidden ${
                      activeImage === index ? 'ring-2 ring-black' : ''
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      width={150}
                      height={150}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div>
            <div className="mb-6">
              <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
              <p className="text-gray-600">
                {product.category} • {product.gender}
              </p>
            </div>

            <div className="mb-6">
              <p className="text-3xl font-bold">₹{product.price.toFixed(2)}</p>
            </div>

            <div className="mb-6">
              <p className="text-gray-700">{product.description}</p>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <label className="block font-semibold mb-3">Size</label>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size: string) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 rounded-xl font-medium transition-all ${
                      selectedSize === size
                        ? 'bg-black text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <label className="block font-semibold mb-3">Color</label>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color: string) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-6 py-3 rounded-xl font-medium transition-all ${
                      selectedColor === color
                        ? 'bg-black text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <label className="block font-semibold mb-3">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <Minus className="h-5 w-5" />
                </button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 transition-all ${
                  isAddedToCart ? 'bg-green-600 hover:bg-green-700' : ''
                }`}
                size="lg"
                disabled={isAddedToCart}
              >
                <ShoppingCart className="h-5 w-5" />
                {isAddedToCart ? 'Added to Cart ✓' : 'Add to Cart'}
              </Button>
              <button
                onClick={handleAddToWishlist}
                className="p-4 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <Heart className="h-6 w-6" />
              </button>
            </div>

            {/* Stock */}
            <div className="mt-6">
              <p className="text-sm text-gray-600">
                {product.stock > 0 ? `${product.stock} items in stock` : 'Out of stock'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}