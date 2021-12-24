import { Router } from 'express';
import { newProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from '../controllers/products.controller';
import { newProductSchema, productDeleteSchema, productIdSchema, productUpdateSchema } from '../validator/products.schema';

const router = Router();

// Public routes
router.get('/products', getAllProducts);
router.get('/product/:id', productIdSchema, getSingleProduct);

// Private routes
router.post('/admin/product/new', newProductSchema, newProduct);
router.put('/admin/product/:id', productUpdateSchema, updateProduct);
router.delete('/admin/product/:id', productDeleteSchema, deleteProduct);

export default router;
