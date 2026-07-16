import ProductCard from '@/components/ProductCard';
import { notFound } from 'next/navigation';

async function getProducts(gender: string, category?: string) {
  try {
    let url = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/products?gender=${gender}`;
    if (category) {
      url += `&category=${category}`;
    }
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return data.products || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ gender: string }>;
  searchParams: Promise<{ type?: string }>;
}) {
  const { gender: genderParam } = await params;
  const { type } = await searchParams;
  
  const genderMap: Record<string, string> = {
    men: 'Men',
    women: 'Women',
    children: 'Children',
  };

  const gender = genderMap[genderParam.toLowerCase()];

  if (!gender) {
    notFound();
  }

  const products = await getProducts(gender, type);

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{gender}'s Collection</h1>
          <p className="text-gray-600 text-lg">
            Discover our premium selection for {gender.toLowerCase()}
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-4">
          <a
            href={`/category/${genderParam}`}
            className={`px-6 py-2 rounded-full transition-colors ${
              !type ? 'bg-black text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            All
          </a>
          <a
            href={`/category/${genderParam}?type=Shirts`}
            className={`px-6 py-2 rounded-full transition-colors ${
              type === 'Shirts' ? 'bg-black text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Shirts
          </a>
          <a
            href={`/category/${genderParam}?type=T-Shirts`}
            className={`px-6 py-2 rounded-full transition-colors ${
              type === 'T-Shirts' ? 'bg-black text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            T-Shirts
          </a>
          <a
            href={`/category/${genderParam}?type=Jerseys`}
            className={`px-6 py-2 rounded-full transition-colors ${
              type === 'Jerseys' ? 'bg-black text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Jerseys
          </a>
          {gender === 'Women' && (
            <a
              href={`/category/${genderParam}?type=Wears`}
              className={`px-6 py-2 rounded-full transition-colors ${
                type === 'Wears' ? 'bg-black text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Wears
            </a>
          )}
          {(gender === 'Men' || gender === 'Women') && (
            <a
              href={`/category/${genderParam}?type=Jeans`}
              className={`px-6 py-2 rounded-full transition-colors ${
                type === 'Jeans' ? 'bg-black text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Jeans
            </a>
          )}
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No products found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}