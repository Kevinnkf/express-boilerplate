// Input validation middleware
export const validateUserRegister = (req, res, next) => {
    const { username, email, password, name } = req.body;
    const errors = {};

    if (!username || username.trim().length < 3) {
        errors.username = 'Username must be at least 3 characters long';
    }

    if (!email || !isValidEmail(email)) {
        errors.email = 'Valid email is required';
    }

    if (!password || password.length < 6) {
        errors.password = 'Password must be at least 6 characters long';
    }

    if (!name || name.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters long';
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors
        });
    }

    next();
};

export const validateUserLogin = (req, res, next) => {
    const { email, password } = req.body;
    const errors = {};

    if (!email || !isValidEmail(email)) {
        errors.email = 'Valid email is required';
    }

    if (!password) {
        errors.password = 'Password is required';
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors
        });
    }

    next();
};

export const validateProjectCreate = (req, res, next) => {
    const { name, description, url, imageUrl } = req.body;
    const errors = {};

    if (!name || name.trim().length < 3) {
        errors.name = 'Project name must be at least 3 characters long';
    }

    if (url && !isValidUrl(url)) {
        errors.url = 'Invalid URL format';
    }

    if (imageUrl && !isValidUrl(imageUrl)) {
        errors.imageUrl = 'Invalid image URL format';
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors
        });
    }

    next();
};

export const validateProjectUpdate = (req, res, next) => {
    const { name, url, imageUrl } = req.body;
    const errors = {};

    if (name && name.trim().length < 3) {
        errors.name = 'Project name must be at least 3 characters long';
    }

    if (url && !isValidUrl(url)) {
        errors.url = 'Invalid URL format';
    }

    if (imageUrl && !isValidUrl(imageUrl)) {
        errors.imageUrl = 'Invalid image URL format';
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors
        });
    }

    next();
};

// Helper functions
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const isValidUrl = (string) => {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
};
