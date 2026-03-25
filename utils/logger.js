// Simple logging utility
const LOG_LEVELS = {
    ERROR: 'ERROR',
    WARN: 'WARN',
    INFO: 'INFO',
    DEBUG: 'DEBUG'
};

const getTimestamp = () => {
    return new Date().toISOString();
};

const formatLog = (level, message, data = null) => {
    let log = `[${getTimestamp()}] [${level}] ${message}`;
    if (data) {
        log += ` | ${JSON.stringify(data)}`;
    }
    return log;
};

export const logger = {
    error: (message, data = null) => {
        console.error(formatLog(LOG_LEVELS.ERROR, message, data));
    },

    warn: (message, data = null) => {
        console.warn(formatLog(LOG_LEVELS.WARN, message, data));
    },

    info: (message, data = null) => {
        console.log(formatLog(LOG_LEVELS.INFO, message, data));
    },

    debug: (message, data = null) => {
        if (process.env.NODE_ENV === 'development') {
            console.log(formatLog(LOG_LEVELS.DEBUG, message, data));
        }
    }
};
