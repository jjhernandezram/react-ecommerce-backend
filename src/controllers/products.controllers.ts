import { NextFunction, Request, Response } from 'express';
import Product from '../models/product.model';
import Category from '../models/category.model';
import { RequestError, UnhandledError } from '../errors/error-handlers';
import { pipeline } from '../utils/db-query-params';

export const newProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, category, ...body } = req.body;

    const productExist = await Product.findOne({ name: RegExp(name, 'i') });
    if (productExist) return next(new RequestError('Product already exists.', 400));

    const categoryExist = await Category.findOne({ name: RegExp(category, 'i') });
    if (!categoryExist) return next(new RequestError('Category does not exist.', 400));

    const data = {
      name,
      category: categoryExist._id,
      ...body, 
    };

    const newProduct = await new Product(data)//.save();

    res.status(201).json({ msg: 'New product added successfully.', product: newProduct });

  } catch (err) {
    console.log(err);
    next(new UnhandledError());
  }
};

export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = 1, limit = 6 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    // const products = await Product.aggregate(pipeline).limit(Number(limit)).skip(skip);
    const products = await Product.find({}).populate('category', { name: 1, _id: 0 }).limit(Number(limit)).skip(skip);

    res.status(200).json({ page, count: products.length, products });
  } catch (err) {
    console.log(err);
    next(new UnhandledError());
  }
};

export const getSingleProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return next(new RequestError('Invalid object Id.', 400));

    res.status(200).json({ product });
  } catch (err) {
    console.log(err);
    next(new UnhandledError());
  }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true });

    if (!product) return next(new RequestError('Invalid object Id.', 400));

    res.status(200).json({ msg: 'Product updated successfully!', product });
  } catch (err) {
    console.log(err);
    next(new UnhandledError());
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, { active: false }, { new: true });

    if (!product) return next(new RequestError('Invalid object Id.', 400));

    res.status(200).json({ msg: 'Product deleted successfully!', product });
  } catch (err) {
    console.log(err);
    next(new UnhandledError());
  }
};
