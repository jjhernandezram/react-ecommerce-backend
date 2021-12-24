import { NextFunction, Request, Response } from 'express';
import { RequestError, UnhandledError } from '../errors/error-handlers';
import Category from '../models/category.model';
import Product from '../models/product.model';

export const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ count: categories.length, categories });
  } catch (err) {
    console.log(err);
    next(new UnhandledError());
  }
};

export const newCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;
    const category = await Category.findOne({ name: RegExp(name, 'i') });

    if (category) return next(new RequestError('Category already exists.', 400));

    const newCategoryName = await new Category({ name }).save();

    res.status(201).json({ msg: 'Added new category', category: newCategoryName });
  } catch (err) {
    console.log(err);
    next(new UnhandledError());
  }
};

export const getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) return next(new RequestError('Category does not exists.', 400));

    res.status(200).json({ category });
  } catch (err) {
    console.log(err);
    next(new UnhandledError());
  }
};

export const getProductsByCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = 1, limit = 6 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const { category } = req.params;
    const categoryExist = await Category.findOne({ name: RegExp(category, 'i') });

    if (!category) return next(new RequestError('Category does not exists.', 400));

    const products = await Product.find({ category: categoryExist._id }).limit(Number(limit)).skip(skip);
    res.status(200).json({ category: categoryExist.name, page, count: products.length, products });
  } catch (err) {
    console.log(err);
    next(new UnhandledError());
  }
};

export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const categoryExist = await Category.findOne({ name: RegExp(name, 'i') });
    if (categoryExist) return next(new RequestError('Name of the category already exists.', 400));

    const category = await Category.findByIdAndUpdate(id, { name }, { new: true });
    if (!category) return next(new RequestError('Category does not exists.', 400));

    res.status(200).json({ msg: 'Category updated successfully.', category });
  } catch (err) {
    console.log(err);
    next(new UnhandledError());
  }
};

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(id, { active: false }, { new: true });
    if (!category) return next(new RequestError('Category does not exists.', 400));

    res.status(200).json({ msg: 'Category deleted successfully!', category });
  } catch (err) {
    console.log(err);
    next(new UnhandledError());
  }
};
