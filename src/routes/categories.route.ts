import { Router } from 'express';
import { deleteCategory, getAllCategories, getCategoryById, getProductsByCategory, newCategory, updateCategory } from '../controllers/categories.controller';
import { categoryUpdateOrDeleteSchema, newCategorySchema } from '../validator/categories.schema';

const router = Router();

// Public routes
router.get('/categories', getAllCategories);
router.get('/category/:category', getProductsByCategory);
router.get('/category/:id', getCategoryById);

// Private routes
router.post('/admin/category/new', newCategorySchema, newCategory);
router.put('/admin/category/:id', categoryUpdateOrDeleteSchema, updateCategory);
router.delete('/admin/category/:id', categoryUpdateOrDeleteSchema, deleteCategory);

export default router;
