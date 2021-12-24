import { Document, model, Schema } from 'mongoose';

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  status: {
    type: Boolean,
    default: true,
    required: true,
  },
});

export interface ICategory extends Document {
  name: String | RegExp;
  status: Boolean;
}


categorySchema.methods.toJSON = function () {
  const { __v, _id, ...category } = this.toObject();
  category.id = _id;
  return category;
};


export default model<ICategory>('Category', categorySchema);
