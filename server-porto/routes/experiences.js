import express from 'express';

import { getAllExperiences, addExperience, editExperience} from '../controller/experiences.js';

const router = express.Router();

router.get('/', getAllExperiences);
router.post('/create', addExperience);
// router.delete('/delete/:id', deleteProject);
router.put('/update/:id', editExperience);

export default router;