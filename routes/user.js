import express from 'express';
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from '../controller/user.js';
import { verifyToken } from '../middleware/auth.js';
import { validateUserRegister } from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/register', validateUserRegister, createUser);

// Protected routes
router.put('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, deleteUser);

export default router;

