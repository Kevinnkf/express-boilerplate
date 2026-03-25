// Consistent response formatting
export const successResponse = (res, statusCode, message, data = null) => {
    res.status(statusCode).json({
        success: true,
        message,
        ...(data && { data })
    });
};

export const errorResponse = (res, statusCode, message, errors = null) => {
    res.status(statusCode).json({
        success: false,
        message,
        ...(errors && { errors })
    });
};

export const validationError = (res, errors) => {
    res.status(400).json({
        success: false,
        message: 'Validation error',
        errors
    });
};
