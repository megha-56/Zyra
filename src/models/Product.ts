import mongoose, { Schema, Model } from 'mongoose';

export interface IProduct {
  _id?: string;
  name: string;
  description: string;
  price: number;
  category: 'Shirts' | 'T-Shirts' | 'Jerseys' | 'Wears' | 'Jeans';
  gender: 'Men' | 'Women' | 'Children' | 'Unisex';
  images: string[];
  sizes: ('XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL')[];
  colors: string[];
  stock: number;
  featured: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a product name'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price'],
    },
    category: {
      type: String,
      enum: ['Shirts', 'T-Shirts', 'Jerseys', 'Wears', 'Jeans'],
      required: true,
    },
    gender: {
      type: String,
      enum: ['Men', 'Women', 'Children', 'Unisex'],
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    sizes: {
      type: [String],
      enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      default: ['S', 'M', 'L', 'XL'],
    },
    colors: {
      type: [String],
      default: ['Black', 'White'],
    },
    stock: {
      type: Number,
      default: 100,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;