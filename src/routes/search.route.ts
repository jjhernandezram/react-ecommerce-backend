import { Router } from 'express';
import { searchProducts } from '../controllers/search.controller';

const router = Router();

// Public routes
router.get('/search', searchProducts);

export default router;
