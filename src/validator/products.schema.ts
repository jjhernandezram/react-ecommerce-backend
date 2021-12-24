import { body, check } from 'express-validator';
import { requestValidator } from '../middlewares/request-validator.middleware';
import { tokenVerification } from '../middlewares/verify-token.middleware';

export const newProductSchema: any = [
  body('name').notEmpty().withMessage('Name of the product is required.'),
  body('price').notEmpty().withMessage('Price is required.'),
  body('price').isNumeric().withMessage('Price must be numeric.'),
  body('description').notEmpty().withMessage('Name of the product is required.'),
  body('category').notEmpty().withMessage('Must select a product category.'),
  body('seller').notEmpty().withMessage('Must provide product seller.'),
  body('stock').notEmpty().isNumeric().withMessage('Must provide product stock.'),
  requestValidator,
  tokenVerification
];

export const productUpdateSchema: any = [
  check('id', 'Product ID is required.').notEmpty(),
  check('id', 'Must be a valid product ID.').isMongoId(),
  check('name', 'Must be a valid name.').isString(),
  check('price', 'Must be a valid price.').isNumeric(),
  check('description', 'Must be a valid string.').isString(),
  check('seller', 'Must be a valid string.').isString(),
  check('stock', 'Must be a valid string.').isNumeric(),
  requestValidator,
];

export const productIdSchema: any = [
  check('id', 'Product ID is required.').notEmpty(),
  check('id', 'Must be a valid product ID.').isMongoId(),
  requestValidator,
];

export const productDeleteSchema: any = [
  check('id', 'Product ID is required.').notEmpty(),
  check('id', 'Must be a valid product ID.').isMongoId(),
  requestValidator,
];
