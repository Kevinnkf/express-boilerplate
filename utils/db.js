// Database connection and initialization utilities
import db from '../models/index.js';
import { logger } from './logger.js';

export const initializeDatabase = async () => {
    try {
        await db.sequelize.authenticate();
        logger.info('Database connection has been established successfully');
        return true;
    } catch (error) {
        logger.error('Unable to connect to the database', { error: error.message });
        throw error;
    }
};

export const syncDatabase = async (force = false) => {
    try {
        await db.sequelize.sync({ force });
        logger.info('Database synchronized successfully', { force });
        return true;
    } catch (error) {
        logger.error('Database sync failed', { error: error.message });
        throw error;
    }
};

export const closeDatabase = async () => {
    try {
        await db.sequelize.close();
        logger.info('Database connection closed');
        return true;
    } catch (error) {
        logger.error('Error closing database connection', { error: error.message });
        throw error;
    }
};
