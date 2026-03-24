# Porto Server API Documentation

## Overview

This is a production-ready Express.js server boilerplate with Sequelize ORM, JWT authentication, and comprehensive error handling.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Setup environment
cp .env.example .env
# Edit .env with your database credentials

# 3. Create database
createdb porto_db

# 4. Run migrations
npm run migrate

# 5. Start server
npm start
# or for development with auto-reload
npm run dev
```

## Available Scripts

```bash
npm start              # Start production server
npm run dev            # Start with auto-reload (development)
npm run migrate        # Run pending migrations
npm run migrate:undo   # Undo last migration
npm run seed           # Seed database with test data
```

## Database Commands

```bash
# Create a new migration
npm run migrate:create -- --name migration-name

# Run migrations
npm run migrate

# Undo last migration
npm run migrate:undo

# Undo all migrations
npm run migrate:undo:all

# Seed database
npm run seed
```

## Architecture

### Middleware Stack

1. **CORS** - Cross-origin request handling
2. **JSON Parser** - Request body parsing
3. **Cookie Parser** - Cookie handling
4. **Error Handler** - Centralized error catching
5. **Auth Middleware** - JWT verification (on protected routes)
6. **Validation** - Request validation (per endpoint)

### Response Format

All API responses follow this format:

```json
{
  "success": true|false,
  "message": "Human-readable message",
  "data": {} // optional
}
```

### Authentication Flow

1. User registers via `POST /api/users/register`
2. User logs in via `POST /api/auth/login` → receives JWT token
3. Client sends token in header: `Authorization: Bearer <token>`
4. Server verifies token and allows access to protected routes

## Model Relationships

```
User (1) ──────► (Many) Project
 │
 ├──► (Many) Skill
 └──► (Many) Experience

Project
 └──► (1) User
```

## Adding New Features

### Adding a New Route

1. Create controller in `controller/newfeature.js`
2. Create route file in `routes/newfeature.js`
3. Register in `routes/index.js`

Example:

```javascript
// controller/skill.js
export const getSkills = async (req, res, next) => {
  try {
    const skills = await db.Skill.findAll();
    successResponse(res, 200, "Skills retrieved", skills);
  } catch (error) {
    next(error);
  }
};
```

```javascript
// routes/skill.js
import express from "express";
import { getSkills } from "../controller/skill.js";

const router = express.Router();
router.get("/", getSkills);
export default router;
```

```javascript
// routes/index.js - add:
import skillRoutes from "./skill.js";
router.use("/skills", skillRoutes);
```

### Adding Validation

Use the validation middleware from `middleware/validation.js`:

```javascript
router.post("/", validateSkillCreate, createSkill);
```

## Error Handling

The error handler catches:

- Validation errors
- Database constraint violations
- JWT errors
- Generic server errors

All errors respond with appropriate status codes and messages.

## Logging

Use the logger utility:

```javascript
import { logger } from "../utils/logger.js";

logger.info("User logged in", { userId: 1 });
logger.error("Database error", { error: err.message });
logger.warn("Rate limit approaching", { count: 95 });
logger.debug("Debug info", { data: "value" });
```

## Environment Variables

See `.env.example` for all available configuration options.

## Deployment Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use strong `JWT_SECRET`
- [ ] Configure `DATABASE_URL` for production DB
- [ ] Set correct `CORS_ORIGIN`
- [ ] Run `npm run migrate` in production
- [ ] Enable HTTPS
- [ ] Monitor logs
- [ ] Setup database backups
- [ ] Use PM2 or similar for process management

## Common Issues

### Port Already in Use

Change `PORT` in `.env` or kill the process using the port

### Database Connection Error

- Verify PostgreSQL is running
- Check credentials in `.env`
- Ensure database exists

### CORS Error

Check `CORS_ORIGIN` matches your frontend URL

### Authentication Failing

- Verify JWT token hasn't expired
- Check `JWT_SECRET` matches
- Ensure token is in correct header format

## Performance Notes

1. Database indexes are set on commonly queried fields
2. Passwords are hashed with bcryptjs (10 salt rounds)
3. JWT tokens expire after 24 hours
4. Connection pooling enabled by default
5. SQL logging disabled in production

## Future Enhancements

- [ ] Add refresh token mechanism
- [ ] Implement rate limiting
- [ ] Add email verification
- [ ] Add password reset flow
- [ ] Implement pagination helper
- [ ] Add caching layer (Redis)
- [ ] Add file upload support
- [ ] Add API documentation (Swagger)
- [ ] Add comprehensive test suite

## Support & Contribution

For issues or improvements, create an issue or PR in the repository.
