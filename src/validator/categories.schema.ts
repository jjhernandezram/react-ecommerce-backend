import { body, check } from 'express-validator';
import { requestValidator } from '../middlewares/request-validator.middleware';

export const newCategorySchema: any = [
  body('name').notEmpty().withMessage('Name of the product is required.'),
  body('name').isString().withMessage('Name of the product must be string.'),
  requestValidator,
];

export const categoryUpdateOrDeleteSchema: any = [
  check('id', 'Product ID is required').notEmpty(),
  check('id', 'Must be a valid product ID').isMongoId(),
  requestValidator,
];
