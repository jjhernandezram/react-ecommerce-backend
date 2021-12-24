import { Router } from 'express';
import { deleteUser, newUser, updateUser } from '../controllers/users.controllers';
import { newUserSchema, userIdSchema } from '../validator/users.validator';

const router = Router();

router.post('/auth/user/new', newUserSchema, newUser);
router.put('/auth/user/:id', userIdSchema, updateUser);
router.delete('/auth/user/:id', userIdSchema, deleteUser);

export default router;
