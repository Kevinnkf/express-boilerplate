import express from 'express'

import { getAllUsers, createUser, updateUser, deleteUser } from '../controller/user.js'

const router = express.Router();

router.get('/', getAllUsers);
router.get('/register', createUser);
router.get('/update', updateUser);
router.get('/deleteUser', deleteUser);

export default router;

