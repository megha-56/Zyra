import mongoose, { Schema, Model } from 'mongoose';

export interface IOrderItem {
  product: string | mongoose.Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  image: string;
}

export interface IOrder {
  _id?: string;
  user: string | mongoose.Types.ObjectId;
  items: IOrderItem[];
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt?: Date;
  updatedAt?: Date;
}

const OrderSchema = new Schema<IOrder>(
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
        },
        name: String,
        price: Number,
        quantity: Number,
        size: String,
        color: String,
        image: String,
      },
    ],
    shippingAddress: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default Order;