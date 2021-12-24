import { body, check } from 'express-validator';
import { requestValidator } from '../middlewares/request-validator';
import { tokenVerification } from '../middlewares/verify-token';

export const newCategorySchema: any = [
  tokenVerification,
  body('name').notEmpty().withMessage('Name of the product is required.'),
  body('name').isString().withMessage('Name of the product must be string.'),
  requestValidator,
];

export const categoryUpdateOrDeleteSchema: any = [
  tokenVerification,
  check('id', 'Product ID is required').notEmpty(),
  check('id', 'Must be a valid product ID').isMongoId(),
  requestValidator,
];
