import jwt from 'jsonwebtoken';
import db from '../models/index.js';
import bcrypt from 'bcryptjs';
import { successResponse, errorResponse } from '../utils/responseHelper.js';
import { logger } from '../utils/logger.js';

const User = db.User;

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            logger.warn('Login attempt with non-existent email', { email });
            return errorResponse(res, 404, 'User not found');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            logger.warn('Login attempt with invalid password', { email });
            return errorResponse(res, 401, 'Invalid credentials');
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET || 'fallbacksecret',
            { expiresIn: '24h' }
        );

        logger.info('User logged in successfully', { userId: user.id, email: user.email });

        successResponse(res, 200, 'Login successful', {
            token,
            user: { id: user.id, username: user.username, email: user.email, name: user.name }
        });
    } catch (error) {
        logger.error('Login error', { error: error.message });
        next(error);
    }
};
