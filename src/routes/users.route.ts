import { Router } from 'express';
import { newUser } from '../controllers/users.controllers';
import { newUserSchema, userIdSchema } from '../validator/users.schema';

const router = Router();

router.post('/auth/user/new', newUserSchema, newUser);
router.put('/auth/user/:id', userIdSchema, newUser);
router.delete('/auth/user/:id', userIdSchema, newUser);

export default router;
