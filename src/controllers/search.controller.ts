import { NextFunction, Request, Response } from 'express';
import { UnhandledError } from '../errors/error-handlers';
import Product from '../models/product.model';

export const searchProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { query } = req.query;
    const { page = 1, limit = 6 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const regexp = new RegExp(String(query), 'i');
    const searchParams = { $or: [{ name: regexp }, { description: regexp }], $and: [{ active: true }] };
    const results = await Product.find(searchParams).limit(Number(limit)).skip(skip);

    res.status(200).json({ page, count: results.length, results });
  } catch (err) {
    console.log(err);
    next(new UnhandledError());
  }
};
