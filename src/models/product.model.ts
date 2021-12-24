import { Document, model, Schema } from 'mongoose';
import { IReview } from './reviews.model';

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },

  price: {
    type: Number,
    required: true,
  },

  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000,
  },

  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },

  seller: {
    type: String,
    required: true,
  },

  stock: {
    type: Number,
    required: true,
    maxlength: 3,
  },

  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Reviews',
    },
  ],

  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],

  rating: {
    type: Number,
    default: 0,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  active: {
    type: Boolean,
    default: true,
  },
});

export interface IProduct extends Document {
  name: String | RegExp;
  price: Number;
  description: String | RegExp;
  category: String;
  seller: String;
  stock: Number;
  reviews: IReview[];
  images: IImages[];
  createdAt: Date;
}

export interface IImages {
  public_id: String;
  url: Number;
}



productSchema.methods.toJSON = function () {
  const { __v, _id, ...product } = this.toObject();
  product.id = _id;
  return product;
};


export default model<IProduct>('Product', productSchema);
