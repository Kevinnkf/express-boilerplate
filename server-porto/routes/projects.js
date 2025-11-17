import express from 'express';

import { getAllProjects, createProject, deleteProject, updateProject } from '../controller/project.js';

const router = express.Router();

router.get('/', getAllProjects);
router.post('/create', createProject);
router.delete('/delete/:id', deleteProject);
router.put('/update/:id', updateProject);

export default router;