import { body, check } from 'express-validator';
import { requestValidator } from '../middlewares/request-validator';
import { validAdminRole } from '../middlewares/user-role';
import { tokenVerification } from '../middlewares/verify-token';

export const newProductSchema: any = [
  tokenVerification,
  validAdminRole,
  body('name').notEmpty().withMessage('Name of the product is required.'),
  body('price').notEmpty().withMessage('Price is required.'),
  body('price').isNumeric().withMessage('Price must be numeric.'),
  body('description').notEmpty().withMessage('Name of the product is required.'),
  body('category').notEmpty().withMessage('Must select a product category.'),
  body('seller').notEmpty().withMessage('Must provide product seller.'),
  body('stock').notEmpty().isNumeric().withMessage('Must provide product stock.'),
  requestValidator,
];

export const productIdSchema: any = [
  check('id', 'Product ID is required.').notEmpty(),
  check('id', 'Must be a valid product ID.').isMongoId(),
  requestValidator,
];

export const productUpdateSchema: any = [
  tokenVerification,
  validAdminRole,
  check('id', 'Product ID is required.').notEmpty(),
  check('id', 'Must be a valid product ID.').isMongoId(),
  check('name', 'Must be a valid name.').isString(),
  check('price', 'Must be a valid price.').isNumeric(),
  check('description', 'Must be a valid string.').isString(),
  check('seller', 'Must be a valid string.').isString(),
  check('stock', 'Must be a valid string.').isNumeric(),
  requestValidator,
];

export const productDeleteSchema: any = [
  tokenVerification,
  validAdminRole,
  check('id', 'Product ID is required.').notEmpty(),
  check('id', 'Must be a valid product ID.').isMongoId(),
  requestValidator,
];
