// Application constants
export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_ERROR: 500
};

export const ERROR_MESSAGES = {
    VALIDATION_FAILED: 'Validation failed',
    UNAUTHORIZED: 'Unauthorized access',
    FORBIDDEN: 'Forbidden',
    NOT_FOUND: 'Resource not found',
    DUPLICATE_ENTRY: 'This entry already exists',
    DATABASE_ERROR: 'Database error occurred',
    SERVER_ERROR: 'Internal server error'
};

export const JWT_CONFIG = {
    EXPIRY: '24h',
    ALGORITHM: 'HS256'
};

export const PASSWORD_CONFIG = {
    MIN_LENGTH: 6,
    SALT_ROUNDS: 10
};

export const VALIDATION_RULES = {
    USERNAME_MIN_LENGTH: 3,
    NAME_MIN_LENGTH: 2,
    PASSWORD_MIN_LENGTH: 6,
    PROJECT_NAME_MIN_LENGTH: 3
};
