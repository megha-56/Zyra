import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import Button from '@/components/Button';
import { ArrowRight } from 'lucide-react';

async function getFeaturedProducts() {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/products?featured=true`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.products || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-gray-100 to-gray-200 py-32 md:py-40 lg:py-48 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
              Welcome to <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-900 to-gray-600">ZYRA</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Discover premium fashion for everyone. Quality clothing that defines your style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch max-w-4xl mx-auto mb-16">
              <Link href="/collections" className="w-full sm:w-auto sm:flex-1">
                <Button size="lg" className="w-full h-full py-6 px-12 text-lg font-semibold flex items-center justify-center">
                  Shop Now <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </Link>
              <Link href="/collections" className="w-full sm:w-auto sm:flex-1">
                <Button size="lg" variant="outline" className="w-full h-full py-6 px-12 text-lg font-semibold">
                  Explore Collections
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto pt-8 border-t border-gray-300">
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">500+</p>
                <p className="text-sm md:text-base text-gray-600">Products</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">10K+</p>
                <p className="text-sm md:text-base text-gray-600">Happy Customers</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">4.9★</p>
                <p className="text-sm md:text-base text-gray-600">Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Men', href: '/category/men', image: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=500' },
              { title: 'Women', href: '/category/women', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500' },
              { title: 'Children', href: '/category/children', image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=500' },
            ].map((category) => (
              <Link
                key={category.title}
                href={category.href}
                className="group relative h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundImage: `url(${category.image})` }}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-4xl font-bold text-white">{category.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Our Collections</h2>
          <p className="text-center text-gray-600 mb-12">Explore our curated selection of premium apparel</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { name: 'Shirts', desc: 'Classic & Contemporary', href: '/products?category=Shirts' },
              { name: 'T-Shirts', desc: 'Casual Comfort', href: '/products?category=T-Shirts' },
              { name: 'Jerseys', desc: 'Sports & Leisure', href: '/products?category=Jerseys' },
            ].map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors shadow-sm hover:shadow-md"
              >
                <h3 className="text-2xl font-bold mb-2">{cat.name}</h3>
                <p className="text-gray-600">{cat.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.slice(0, 8).map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 px-4 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Join the ZYRA Community</h2>
          <p className="text-xl text-gray-300 mb-8">
            Sign up today and get exclusive access to new collections and special offers.
          </p>
          <Link href="/signup">
            <Button size="lg" className=" text-black hover:bg-gray-200">
              Create Account
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}