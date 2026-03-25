import db from '../models/index.js';
import bcrypt from 'bcryptjs';
import { successResponse, errorResponse } from '../utils/responseHelper.js';
import { logger } from '../utils/logger.js';

const User = db.User;

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] } // Don't return passwords
        });
        successResponse(res, 200, 'Users retrieved successfully', users);
    } catch (error) {
        logger.error('Get all users error', { error: error.message });
        next(error);
    }
};

export const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return errorResponse(res, 400, 'Valid user ID is required');
        }

        const user = await User.findByPk(id, {
            attributes: { exclude: ['password'] },
            include: [
                { association: 'projects', attributes: ['id', 'name', 'description'] },
                { association: 'skills', attributes: ['id', 'name', 'level'] }
            ]
        });

        if (!user) {
            return errorResponse(res, 404, 'User not found');
        }

        successResponse(res, 200, 'User retrieved successfully', user);
    } catch (error) {
        logger.error('Get user by ID error', { error: error.message, userId: req.params.id });
        next(error);
    }
};

export const createUser = async (req, res, next) => {
    try {
        const { username, email, password, name } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            name
        });

        logger.info('User created successfully', { userId: newUser.id, email });

        successResponse(res, 201, 'User registered successfully', {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            name: newUser.name
        });
    } catch (error) {
        logger.error('Create user error', { error: error.message });
        next(error);
    }
};

export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return errorResponse(res, 400, 'Valid user ID is required');
        }

        // Don't allow password updates through this endpoint
        const { password, ...updateData } = req.body;

        const [updated] = await User.update(updateData, { where: { id } });

        if (updated) {
            const updatedUser = await User.findOne({
                where: { id },
                attributes: { exclude: ['password'] }
            });
            logger.info('User updated successfully', { userId: id });
            successResponse(res, 200, 'User updated successfully', updatedUser);
        } else {
            return errorResponse(res, 404, 'User not found');
        }
    } catch (error) {
        logger.error('Update user error', { error: error.message, userId: req.params.id });
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return errorResponse(res, 400, 'Valid user ID is required');
        }

        const deleted = await User.destroy({ where: { id } });

        if (deleted) {
            logger.info('User deleted successfully', { userId: id });
            successResponse(res, 200, 'User deleted successfully');
        } else {
            return errorResponse(res, 404, 'User not found');
        }
    } catch (error) {
        logger.error('Delete user error', { error: error.message, userId: req.params.id });
        next(error);
    }
};