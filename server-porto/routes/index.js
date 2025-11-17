import express from 'express';
import summaryRoutes from './summary.js';
import projectRoutes from './projects.js';

const router = express.Router();

// public routes
router.use('/summary', summaryRoutes);
router.use('/projects', projectRoutes);


export default router;
