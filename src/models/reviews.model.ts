import { Document, model, Schema } from 'mongoose';

const reviewsSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: Number,
      required: true,
    },
});

export interface IReview extends Document {
  name: String;
  rating: Number;
  comment: String;
}

export default model<IReview>('Reviews', reviewsSchema);
