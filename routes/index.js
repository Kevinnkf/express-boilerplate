import express from 'express';
import authRoutes from './auth.js';
import projectRoutes from './projects.js';
import userRoutes from './user.js';

const router = express.Router();

// Auth routes (public)
router.use('/auth', authRoutes);

// User routes
router.use('/users', userRoutes);

// Project routes
router.use('/projects', projectRoutes);

export default router;
