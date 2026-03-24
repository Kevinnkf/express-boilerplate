import db from '../models/index.js';
import { successResponse, errorResponse } from '../utils/responseHelper.js';
import { logger } from '../utils/logger.js';

const Project = db.Project;

export const getAllProjects = async (req, res, next) => {
    try {
        const projects = await Project.findAll({
            include: [{ association: 'user', attributes: ['id', 'name', 'username'] }],
            order: [['createdAt', 'DESC']]
        });
        successResponse(res, 200, 'Projects retrieved successfully', projects);
    } catch (error) {
        logger.error('Get all projects error', { error: error.message });
        next(error);
    }
};

export const getProjectById = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return errorResponse(res, 400, 'Valid project ID is required');
        }

        const project = await Project.findByPk(id, {
            include: [{ association: 'user', attributes: ['id', 'name', 'username', 'email'] }]
        });

        if (!project) {
            return errorResponse(res, 404, 'Project not found');
        }

        successResponse(res, 200, 'Project retrieved successfully', project);
    } catch (error) {
        logger.error('Get project by ID error', { error: error.message, projectId: req.params.id });
        next(error);
    }
};

export const getProjectsByUser = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const projects = await Project.findAll({
            where: { userId },
            order: [['createdAt', 'DESC']]
        });

        successResponse(res, 200, 'User projects retrieved successfully', projects);
    } catch (error) {
        logger.error('Get user projects error', { error: error.message, userId: req.user.id });
        next(error);
    }
};

export const createProject = async (req, res, next) => {
    try {
        const { name, description, url, imageUrl } = req.body;

        const newProject = await Project.create({
            name,
            description,
            url,
            imageUrl,
            userId: req.user.id
        });

        logger.info('Project created successfully', { projectId: newProject.id, userId: req.user.id });

        successResponse(res, 201, 'Project created successfully', newProject);
    } catch (error) {
        logger.error('Create project error', { error: error.message, userId: req.user.id });
        next(error);
    }
};

export const updateProject = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return errorResponse(res, 400, 'Valid project ID is required');
        }

        const project = await Project.findByPk(id);
        if (!project) {
            return errorResponse(res, 404, 'Project not found');
        }

        if (project.userId !== req.user.id) {
            logger.warn('Unauthorized project update attempt', { projectId: id, userId: req.user.id });
            return errorResponse(res, 403, 'You can only update your own projects');
        }

        const { name, description, url, imageUrl } = req.body;
        const [updated] = await Project.update(
            { name, description, url, imageUrl },
            { where: { id } }
        );

        if (updated) {
            const updatedProject = await Project.findOne({ where: { id } });
            logger.info('Project updated successfully', { projectId: id, userId: req.user.id });
            successResponse(res, 200, 'Project updated successfully', updatedProject);
        } else {
            return errorResponse(res, 500, 'Project update failed');
        }
    } catch (error) {
        logger.error('Update project error', { error: error.message, projectId: req.params.id });
        next(error);
    }
};

export const deleteProject = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return errorResponse(res, 400, 'Valid project ID is required');
        }

        const project = await Project.findByPk(id);
        if (!project) {
            return errorResponse(res, 404, 'Project not found');
        }

        if (project.userId !== req.user.id) {
            logger.warn('Unauthorized project delete attempt', { projectId: id, userId: req.user.id });
            return errorResponse(res, 403, 'You can only delete your own projects');
        }

        await project.destroy();
        logger.info('Project deleted successfully', { projectId: id, userId: req.user.id });
        successResponse(res, 200, 'Project deleted successfully');
    } catch (error) {
        logger.error('Delete project error', { error: error.message, projectId: req.params.id });
        next(error);
    }
};