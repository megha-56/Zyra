import mongoose from 'mongoose';
import Product from '../src/models/Product';

const MONGODB_URI = process.env.MONGODB_URI

async function updateProducts() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Update all existing Jerseys to be Unisex
    const jerseyUpdate = await Product.updateMany(
      { category: 'Jerseys' },
      { $set: { gender: 'Unisex' } }
    );
    console.log(`Updated ${jerseyUpdate.modifiedCount} jerseys to Unisex`);

    // Update Shirts for Women to Wears
    const wearsUpdate = await Product.updateMany(
      { category: 'Shirts', gender: 'Women' },
      { $set: { category: 'Wears' } }
    );
    console.log(`Updated ${wearsUpdate.modifiedCount} women's shirts to Wears`);

    console.log('Product updates completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error updating products:', error);
    process.exit(1);
  }
}

updateProducts();