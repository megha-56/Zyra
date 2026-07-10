import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

const sampleProducts = [
  // Men's Shirts
  {
    name: 'Classic White Dress Shirt',
    description: 'Premium cotton dress shirt perfect for formal occasions',
    price: 79.99,
    category: 'Shirts',
    gender: 'Men',
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Light Blue', 'Black'],
    stock: 50,
    featured: true,
  },
  {
    name: 'Slim Fit Casual Shirt',
    description: 'Modern slim fit shirt for everyday wear',
    price: 59.99,
    category: 'Shirts',
    gender: 'Men',
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Navy', 'Gray', 'Burgundy'],
    stock: 45,
    featured: false,
  },
  // Men's T-Shirts
  {
    name: 'Essential Cotton T-Shirt',
    description: 'Comfortable everyday cotton t-shirt',
    price: 29.99,
    category: 'T-Shirts',
    gender: 'Men',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White', 'Gray', 'Navy'],
    stock: 100,
    featured: true,
  },
  {
    name: 'V-Neck Premium Tee',
    description: 'Soft premium cotton v-neck t-shirt',
    price: 34.99,
    category: 'T-Shirts',
    gender: 'Men',
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Olive'],
    stock: 60,
    featured: false,
  },
  // Men's Jerseys
  {
    name: 'Performance Sports Jersey',
    description: 'Breathable athletic jersey for sports',
    price: 49.99,
    category: 'Jerseys',
    gender: 'Men',
    images: [
      'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=500',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Red', 'Blue', 'Green'],
    stock: 40,
    featured: true,
  },
  // Women's Shirts
  {
    name: 'Elegant Silk Blouse',
    description: 'Luxurious silk blouse for sophisticated style',
    price: 89.99,
    category: 'Shirts',
    gender: 'Women',
    images: [
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=500',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Cream', 'Black', 'Rose'],
    stock: 35,
    featured: true,
  },
  {
    name: 'Cotton Oxford Shirt',
    description: 'Classic oxford shirt with modern fit',
    price: 64.99,
    category: 'Shirts',
    gender: 'Women',
    images: [
      'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=500',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['White', 'Light Pink', 'Sky Blue'],
    stock: 50,
    featured: false,
  },
  // Women's T-Shirts
  {
    name: 'Soft Cotton Basic Tee',
    description: 'Comfortable basic tee for everyday wear',
    price: 27.99,
    category: 'T-Shirts',
    gender: 'Women',
    images: [
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Pink', 'Navy'],
    stock: 80,
    featured: true,
  },
  {
    name: 'Relaxed Fit Crop Top',
    description: 'Trendy relaxed fit crop top',
    price: 32.99,
    category: 'T-Shirts',
    gender: 'Women',
    images: [
      'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=500',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['White', 'Beige', 'Mint'],
    stock: 55,
    featured: false,
  },
  // Women's Jerseys
  {
    name: 'Active Wear Sports Jersey',
    description: 'Moisture-wicking sports jersey',
    price: 44.99,
    category: 'Jerseys',
    gender: 'Women',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Purple', 'Teal', 'Coral'],
    stock: 45,
    featured: true,
  },
  // Children's Shirts
  {
    name: 'Kids Classic Polo Shirt',
    description: 'Comfortable polo shirt for kids',
    price: 24.99,
    category: 'Shirts',
    gender: 'Children',
    images: [
      'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=500',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Navy', 'Red', 'Yellow'],
    stock: 60,
    featured: false,
  },
  // Children's T-Shirts
  {
    name: 'Fun Graphic Tee',
    description: 'Colorful graphic t-shirt for kids',
    price: 19.99,
    category: 'T-Shirts',
    gender: 'Children',
    images: [
      'https://images.unsplash.com/photo-1622290291468-a28f7a7e8bf3?w=500',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Blue', 'Green', 'Orange'],
    stock: 70,
    featured: true,
  },
  // Children's Jerseys
  {
    name: 'Youth Sports Jersey',
    description: 'Durable sports jersey for active kids',
    price: 34.99,
    category: 'Jerseys',
    gender: 'Children',
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Red', 'Blue', 'Yellow'],
    stock: 50,
    featured: true,
  },
];

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await dbConnect();

    console.log('Clearing existing products...');
    await Product.deleteMany({});

    console.log('Seeding products...');
    const products = await Product.insertMany(sampleProducts);

    console.log(`✅ Successfully seeded ${products.length} products!`);
    console.log('Sample products created:');
    products.forEach((product) => {
      console.log(`- ${product.name} (${product.gender} - ${product.category})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();