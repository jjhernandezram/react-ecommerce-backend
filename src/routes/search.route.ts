import { Router } from 'express';
import { searchProducts } from '../controllers/search.controllers';

const router = Router();

// Public routes
router.get('/search', searchProducts);

export default router;
