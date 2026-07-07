import mongoose, { Schema, Model } from 'mongoose';

export interface ICartItem {
  product: string | mongoose.Types.ObjectId;
  quantity: number;
  size: string;
  color: string;
}

export interface ICart {
  _id?: string;
  user: string | mongoose.Types.ObjectId;
  items: ICartItem[];
  createdAt?: Date;
  updatedAt?: Date;
}

const CartSchema = new Schema<ICart>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        size: {
          type: String,
          required: true,
        },
        color: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Cart: Model<ICart> = mongoose.models.Cart || mongoose.model<ICart>('Cart', CartSchema);

export default Cart;