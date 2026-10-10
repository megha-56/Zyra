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
  {
    name: 'Breezy Linen Summer Shirt',
    description: 'Lightweight breathable linen shirt ideal for warm weather and beach outings',
    price: 69.99,
    category: 'Shirts',
    gender: 'Men',
    images: [
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=500',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Beige', 'White', 'Olive', 'Sky Blue'],
    stock: 55,
    featured: true,
  },
  {
    name: 'Plaid Flannel Button-Down',
    description: 'Soft brushed cotton flannel shirt with a timeless tartan plaid pattern',
    price: 64.99,
    category: 'Shirts',
    gender: 'Men',
    images: [
      'https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=500',
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Red/Black', 'Navy/Green', 'Charcoal'],
    stock: 40,
    featured: false,
  },
  {
    name: 'Denim Chambray Work Shirt',
    description: 'Durable chambray weave shirt with dual chest pockets and rugged stitching',
    price: 74.99,
    category: 'Shirts',
    gender: 'Men',
    images: [
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=500',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Indigo', 'Light Wash'],
    stock: 35,
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
  {
    name: 'Oversized Streetwear Heavy Tee',
    description: 'Heavyweight combed cotton t-shirt with dropped shoulders and relaxed fit',
    price: 39.99,
    category: 'T-Shirts',
    gender: 'Men',
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Charcoal', 'Sand', 'Black', 'Forest Green'],
    stock: 85,
    featured: true,
  },
  {
    name: 'Classic Pique Polo T-Shirt',
    description: 'Breathable cotton pique polo with ribbed collar and two-button placket',
    price: 44.99,
    category: 'T-Shirts',
    gender: 'Men',
    images: [
      'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=500',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Navy', 'White', 'Burgundy', 'Royal Blue'],
    stock: 70,
    featured: false,
  },
  {
    name: 'Vintage Graphic Print Tee',
    description: 'Washed cotton crew neck t-shirt featuring retro artwork print',
    price: 36.99,
    category: 'T-Shirts',
    gender: 'Men',
    images: [
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Vintage Black', 'Off-White'],
    stock: 50,
    featured: false,
  },
  // Men's Jeans
  {
    name: 'Classic Straight Fit Denim Jeans',
    description: 'Timeless five-pocket straight leg jeans crafted from durable selvedge denim',
    price: 84.99,
    category: 'Jeans',
    gender: 'Men',
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Dark Indigo', 'Medium Wash', 'Black'],
    stock: 65,
    featured: true,
  },
  {
    name: 'Slim Tapered Stretch Jeans',
    description: 'Modern slim-fit jeans with added elastane for all-day comfort and mobility',
    price: 79.99,
    category: 'Jeans',
    gender: 'Men',
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Jet Black', 'Dark Blue', 'Charcoal Gray'],
    stock: 55,
    featured: false,
  },
  {
    name: 'Distressed Streetwear Denim',
    description: 'Urban style ripped jeans with subtle fading and tapered ankle cuff',
    price: 89.99,
    category: 'Jeans',
    gender: 'Men',
    images: [
      'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=500',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Light Wash', 'Ice Blue', 'Washed Black'],
    stock: 40,
    featured: false,
  },
  {
    name: 'Relaxed Fit Carpenter Jeans',
    description: 'Loose-fitting vintage wash denim with utility loop and reinforced seams',
    price: 92.99,
    category: 'Jeans',
    gender: 'Men',
    images: [
      'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=500',
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Vintage Blue', 'Stone Wash'],
    stock: 45,
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
  {
    name: 'Classic Mesh Basketball Jersey',
    description: 'Sleeveless breathable mesh basketball jersey with contrast striped trim',
    price: 54.99,
    category: 'Jerseys',
    gender: 'Men',
    images: [
      'https://images.unsplash.com/photo-1515523110800-9415d13b84a8?w=500',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Gold/Purple', 'Black/Red', 'White/Blue'],
    stock: 50,
    featured: false,
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
  {
    name: 'Oversized Poplin Button-Down',
    description: 'Crisp organic cotton poplin shirt with a relaxed, effortlessly chic silhouette',
    price: 72.99,
    category: 'Shirts',
    gender: 'Women',
    images: [
      'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=500',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Sage Green', 'Powder Blue'],
    stock: 45,
    featured: true,
  },
  {
    name: 'Satin Drape Collar Blouse',
    description: 'Silky-smooth satin button-up shirt suitable for office wear and evening dinners',
    price: 78.99,
    category: 'Shirts',
    gender: 'Women',
    images: [
      'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=500',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Champagne', 'Emerald', 'Burgundy'],
    stock: 30,
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
  {
    name: 'Ribbed Fitted Crewneck Tee',
    description: 'Stretchy micro-ribbed cotton t-shirt that contours comfortably to your shape',
    price: 31.99,
    category: 'T-Shirts',
    gender: 'Women',
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Espresso', 'Cream', 'Black', 'Lavender'],
    stock: 75,
    featured: false,
  },
  {
    name: 'Botanical Art Graphic Tee',
    description: 'Soft organic cotton tee featuring minimalist line-art botanical illustration',
    price: 35.99,
    category: 'T-Shirts',
    gender: 'Women',
    images: [
      'https://images.unsplash.com/photo-1554568218-0f1715e72254?w=500',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Ecru', 'Dusty Rose', 'Sage'],
    stock: 60,
    featured: false,
  },
  // Women's Wears
  {
    name: 'Floral Tiered Midi Summer Dress',
    description: 'Flowy chiffon midi dress with delicate floral prints and adjustable tie straps',
    price: 94.99,
    category: 'Wears',
    gender: 'Women',
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Blush Floral', 'Sky Blue', 'Lemon Yellow'],
    stock: 40,
    featured: true,
  },
  {
    name: 'Tailored Linen Blazer & Trouser Set',
    description: 'Sophisticated two-piece co-ord set featuring a structured blazer and wide-leg pants',
    price: 129.99,
    category: 'Wears',
    gender: 'Women',
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Oatmeal', 'Black', 'Camel'],
    stock: 25,
    featured: true,
  },
  {
    name: 'Pleated Wide-Leg Belted Jumpsuit',
    description: 'Effortless one-piece jumpsuit with a cinched waist belt and flowing pleated legs',
    price: 104.99,
    category: 'Wears',
    gender: 'Women',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Emerald Green', 'Navy', 'Terracotta'],
    stock: 35,
    featured: false,
  },
  {
    name: 'Satin Wrap Evening Maxi Dress',
    description: 'Floor-length wrap dress with a flattering v-neckline and subtle side slit',
    price: 114.99,
    category: 'Wears',
    gender: 'Women',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Ruby Red', 'Midnight Black', 'Champagne'],
    stock: 30,
    featured: false,
  },
  // Women's Jeans
  {
    name: 'High-Rise Vintage Mom Jeans',
    description: 'High-waisted rigid denim jeans with a relaxed hip and tapered ankle',
    price: 82.99,
    category: 'Jeans',
    gender: 'Women',
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Light Vintage Blue', 'Medium Wash', 'Ecru'],
    stock: 60,
    featured: true,
  },
  {
    name: 'Wide-Leg High Waist Palazzo Jeans',
    description: 'Statement wide-leg denim jeans with a flattering high rise and full-length hem',
    price: 88.99,
    category: 'Jeans',
    gender: 'Women',
    images: [
      'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=500',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Dark Indigo', 'Ice Blue', 'Black'],
    stock: 45,
    featured: false,
  },
  {
    name: 'Sculpting Skinny Stretch Jeans',
    description: 'High-recovery stretch denim that hugs curves with a sleek ankle-grazing fit',
    price: 76.99,
    category: 'Jeans',
    gender: 'Women',
    images: [
      'https://images.unsplash.com/photo-1475178626620-a4d074967452?w=500',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Jet Black', 'Classic Blue', 'White'],
    stock: 70,
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
  // Unisex Jerseys
  {
    name: 'Pro Club Football Team Jersey',
    description: 'Official stadium-style unisex football jersey with ventilated mesh panels',
    price: 59.99,
    category: 'Jerseys',
    gender: 'Unisex',
    images: [
      'https://images.unsplash.com/photo-1577212017184-80cc0da11082?w=500',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Royal Blue/White', 'Crimson/Gold', 'Black/Neon'],
    stock: 90,
    featured: true,
  },
  {
    name: 'Retro 90s Throwback Basketball Jersey',
    description: 'Unisex vintage-inspired hardwood jersey with stitched tackle-twill numbering',
    price: 64.99,
    category: 'Jerseys',
    gender: 'Unisex',
    images: [
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Teal/Black', 'Chicago Red', 'Kelly Green'],
    stock: 65,
    featured: true,
  },
  {
    name: 'Esports Pro Championship Jersey',
    description: 'Ultra-lightweight sublimated jersey designed for gaming tournaments and everyday comfort',
    price: 52.99,
    category: 'Jerseys',
    gender: 'Unisex',
    images: [
      'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=500',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Cyber Black/Cyan', 'Stealth White/Red'],
    stock: 50,
    featured: false,
  },
  {
    name: 'Marathon Aero Running Jersey',
    description: 'Quick-dry reflective unisex athletic jersey built for distance runners and training',
    price: 47.99,
    category: 'Jerseys',
    gender: 'Unisex',
    images: [
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Neon Lime', 'Electric Orange', 'Cobalt Blue'],
    stock: 60,
    featured: false,
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
  {
    name: 'Kids Checked Flannel Shirt',
    description: 'Cozy brushed cotton button-up shirt for school days and family outings',
    price: 29.99,
    category: 'Shirts',
    gender: 'Children',
    images: [
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Red Plaid', 'Blue Plaid', 'Green Plaid'],
    stock: 50,
    featured: true,
  },
  {
    name: 'Junior Crisp Party Dress Shirt',
    description: 'Smart breathable cotton button-down shirt for special occasions',
    price: 32.99,
    category: 'Shirts',
    gender: 'Children',
    images: [
      'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=500',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['White', 'Sky Blue', 'Mint'],
    stock: 45,
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
  {
    name: 'Space Explorer Cotton Tee',
    description: 'Super-soft 100% cotton t-shirt with glow-inspired astronaut and planet graphics',
    price: 21.99,
    category: 'T-Shirts',
    gender: 'Children',
    images: [
      'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=500',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Navy', 'Heather Gray', 'White'],
    stock: 80,
    featured: false,
  },
  {
    name: 'Rainbow Striped Play Tee',
    description: 'Bright yarn-dyed striped crew neck tee built for everyday playground adventures',
    price: 22.99,
    category: 'T-Shirts',
    gender: 'Children',
    images: [
      'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=500',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Multi Stripe', 'Sunshine Yellow', 'Coral'],
    stock: 65,
    featured: false,
  },
  // Children's Jeans
  {
    name: 'Kids Comfort Stretch Denim Jeans',
    description: 'Durable pull-on denim jeans with an adjustable elastic waistband for growing kids',
    price: 38.99,
    category: 'Jeans',
    gender: 'Children',
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Classic Blue', 'Dark Wash'],
    stock: 55,
    featured: false,
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
  {
    name: 'Junior Striker Soccer Jersey',
    description: 'Lightweight sweat-wicking team jersey for youth soccer practice and matches',
    price: 36.99,
    category: 'Jerseys',
    gender: 'Children',
    images: [
      'https://images.unsplash.com/photo-1577212017184-80cc0da11082?w=500',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Electric Blue', 'Neon Green', 'White/Red'],
    stock: 60,
    featured: false,
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