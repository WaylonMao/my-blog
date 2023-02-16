import express from 'express';
import { getUserById, updateUser, deleteUser } from '../controllers/user.js';
import protect from '../middleware/protect.js';

const router = express.Router();

router.put('/:id', protect, updateUser);
router.delete('/:id', protect, deleteUser);
router.get('/:id', getUserById);

export default router;
