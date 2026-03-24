import express from 'express';
import { login } from '../controller/auth.js';
import { validateUserLogin } from '../middleware/validation.js';

const router = express.Router();

router.post('/login', validateUserLogin, login);

export default router;
