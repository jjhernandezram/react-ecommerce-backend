import { Router } from 'express';
import { authLogin, authLogout } from '../controllers/auth.controllers';

const router = Router();

router.post('/auth/login', authLogin);
router.post('/auth/logout', authLogout);

export default router;
