import express from 'express';
import {
    getAllProjects,
    getProjectById,
    getProjectsByUser,
    createProject,
    updateProject,
    deleteProject
} from '../controller/project.js';
import { verifyToken } from '../middleware/auth.js';
import { validateProjectCreate, validateProjectUpdate } from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.get('/', getAllProjects);
router.get('/:id', getProjectById);

// Protected routes
router.get('/user/my-projects', verifyToken, getProjectsByUser);
router.post('/', verifyToken, validateProjectCreate, createProject);
router.put('/:id', verifyToken, validateProjectUpdate, updateProject);
router.delete('/:id', verifyToken, deleteProject);

export default router;