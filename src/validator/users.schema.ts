import { body, check } from 'express-validator';
import { requestValidator } from '../middlewares/request-validator.middleware';

export const newUserSchema: any = [
  body('name').notEmpty().withMessage('Username is required.'),
  body('email').notEmpty().withMessage('Email is required.'),
  body('email').isEmail().withMessage('Must be a valid email.'),
  body('password').notEmpty().withMessage('Password is required.'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters.'),
  requestValidator,
];

export const userIdSchema: any = [
  check('id', 'User ID is required.').notEmpty(),
  check('id', 'Must be a valid user ID.').isMongoId(),
  requestValidator,
];