# Express.js API Boilerplate

> A production-ready, enterprise-grade Express.js server boilerplate with Sequelize ORM, PostgreSQL, JWT authentication, comprehensive error handling, input validation, structured logging, and industry best practices pre-configured.

[![Node.js](https://img.shields.io/badge/Node-14%2B-green)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-blue)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-12%2B-blue)](https://www.postgresql.org/)
[![Sequelize](https://img.shields.io/badge/Sequelize-6.x-success)](https://sequelize.org/)
[![License](https://img.shields.io/badge/License-ISC-yellow)](LICENSE)

## ✨ Features

✅ **Express.js 5.x** - Fast, unopinionated web framework  
✅ **Sequelize ORM** - Object-relational mapping with PostgreSQL  
✅ **JWT Authentication** - Secure token-based authentication with 24h expiry  
✅ **Input Validation** - Request body validation with detailed error messages  
✅ **Centralized Error Handling** - Comprehensive error handler for all scenarios  
✅ **Structured Logging** - Multi-level logging (ERROR, WARN, INFO, DEBUG)  
✅ **Response Standardization** - Consistent JSON response format across all endpoints  
✅ **CORS & Security** - CORS support, password hashing with bcryptjs, secure defaults  
✅ **Environment Configuration** - 12-factor app ready with .env template  
✅ **Database Migrations** - Schema versioning with Sequelize CLI  
✅ **Helper Utilities** - Response formatting, date helpers, constants  
✅ **RESTful API Design** - Proper HTTP methods and status codes  
✅ **Health Checks** - Built-in health check endpoint  
✅ **Async Error Handling** - Automatic Promise rejection handling  

## 🚀 Quick Start

### Prerequisites

- **Node.js** 14 or higher
- **PostgreSQL** 12 or higher
- **npm** or **yarn**

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Kevinnkf/express-boilerplate.git
cd express-boilerplate

# 2. Install dependencies
npm install

# 3. Setup environment
cp .env.example .env

# 4. Configure your database in .env
# Edit .env with your PostgreSQL credentials
```

### Configuration

Edit `.env`:

```env
# Database
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_password_here
DB_NAME=express_boilerplate
DB_PORT=5432

# Server
NODE_ENV=development
PORT=3005

# JWT
JWT_SECRET=your_secret_key_change_in_production

# CORS
CORS_ORIGIN=http://localhost:5173

# Production Database URL (optional)
# DATABASE_URL=postgresql://user:password@host:5432/db_name
```

### Database Setup

```bash
# Create database
createdb express_boilerplate

# Run migrations
npm run migrate

# (Optional) Seed with sample data
npm run seed
```

### Start Development Server

```bash
# Development with auto-reload
npm run dev

# Or production mode
npm start
```

✅ API is running at `http://localhost:3005`

## 📖 Available Commands

```bash
npm start              # Start production server
npm run dev            # Start with auto-reload
npm run migrate        # Run pending database migrations
npm run migrate:undo   # Undo last migration
npm run migrate:create # Create new migration
npm run seed           # Seed database with data
```

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/login` | Login with email & password | ❌ |

### Users

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/users` | Get all users | ❌ |
| GET | `/api/users/:id` | Get user by ID | ❌ |
| POST | `/api/users/register` | Register new user | ❌ |
| PUT | `/api/users/:id` | Update user profile | ✅ |
| DELETE | `/api/users/:id` | Delete user account | ✅ |

### Projects

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/projects` | Get all projects | ❌ |
| GET | `/api/projects/:id` | Get project details | ❌ |
| GET | `/api/projects/user/my-projects` | Get current user's projects | ✅ |
| POST | `/api/projects` | Create new project | ✅ |
| PUT | `/api/projects/:id` | Update project | ✅ |
| DELETE | `/api/projects/:id` | Delete project | ✅ |

### System

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check endpoint |
| GET | `/` | API welcome message |

## 🔐 Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Token Details:**
- Issued on successful login
- Expires in 24 hours
- Contains user ID and email
- Implement token refresh on the client side

## 📝 Quick API Examples

### Register User

```bash
POST /api/users/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

### Login

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "username": "johndoe",
      "email": "john@example.com",
      "name": "John Doe"
    }
  }
}
```

### Create Project (Protected)

```bash
POST /api/projects
Authorization: Bearer <your_token_here>
Content-Type: application/json

{
  "name": "My Awesome Project",
  "description": "A cool project",
  "url": "https://github.com/user/project",
  "imageUrl": "https://example.com/image.png"
}
```

## ⚠️ Error Handling

All errors follow a consistent structure:

```json
{
  "success": false,
  "message": "Human-readable error message",
  "errors": {
    "field": "Field-specific error message"
  }
}
```

### HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Validation error |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not found |
| 409 | Duplicate entry |
| 500 | Server error |

## 📁 Project Structure

```
express-boilerplate/
├── config/               # Database configuration
├── controller/           # Business logic
│   ├── auth.js
│   ├── project.js
│   └── user.js
├── middleware/           # Custom middleware
│   ├── auth.js
│   ├── errorHandler.js
│   └── validation.js
├── migrations/           # Database schema
├── models/              # Data models
│   ├── index.js
│   ├── project.js
│   └── user.js
├── routes/              # API routes
│   ├── index.js
│   ├── auth.js
│   ├── projects.js
│   └── user.js
├── utils/               # Helper functions
│   ├── dateHelper.js
│   ├── logger.js
│   ├── responseHelper.js
│   ├── db.js
│   └── constants.js
├── index.js             # Server entry point
└── .env.example         # Environment template
```

## 🛠️ Adding New Features

### Create a New Model

1. Create model in `models/newmodel.js`
2. Create migration: `npm run migrate:create -- --name create-newmodel`
3. Update associations in parent models
4. Create controller, routes

Example:

```javascript
// models/skill.js
export default (sequelize, DataTypes) => {
    class Skill extends Model {
        static associate(models) {
            Skill.belongsTo(models.User, { foreignKey: 'userId' });
        }
    }
    Skill.init({
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false },
        level: { type: DataTypes.ENUM('beginner', 'intermediate', 'expert') }
    }, {
        sequelize,
        modelName: 'Skill'
    });
    return Skill;
}
```

### Add a New Route

Create controller → Create routes → Register in routes/index.js

## 📊 Database Commands

```bash
# Run migrations
npm run migrate

# Undo last migration
npm run migrate:undo

# Create migration
npm run migrate:create -- --name migration-name

# Seed database
npm run seed
```

## 🌐 Deployment

### Environment Setup

```env
NODE_ENV=production
DATABASE_URL=postgresql://user:password@host:5432/db
JWT_SECRET=your_strong_secret_key_here
CORS_ORIGIN=https://yourdomain.com
```

### Quick Deploy on Railway

```bash
npm i -g @railway/cli
railway login
railway init
railway add  # Add PostgreSQL
railway variables
railway up
```

## 🔒 Security Best Practices

✅ Passwords hashed with bcryptjs  
✅ JWT expiration in place  
✅ Input validation on all endpoints  
✅ SQL injection prevention  
✅ CORS whitelist support  
✅ Environment variables for secrets  

**Recommended additions:**
- Rate limiting: `npm install express-rate-limit`
- Security headers: `npm install helmet`
- Request sanitization: `npm install xss-clean`

## 🔧 Troubleshooting

### Database connection failed
```bash
# Check PostgreSQL is running
psql -U postgres

# Create database
createdb express_boilerplate
```

### Common Issues

| Issue | Solution |
|-------|----------|
| Port in use | Change PORT in .env |
| Token expired | User needs to login |
| CORS blocked | Update CORS_ORIGIN |
| DB not found | Run: createdb express_boilerplate |

## 📚 Documentation

- **[API_GUIDE.md](API_GUIDE.md)** - Detailed API docs
- **[IMPROVEMENTS.md](IMPROVEMENTS.md)** - What's included

## 💡 Using as Template

```bash
git clone https://github.com/Kevinnkf/express-boilerplate.git my-api
cd my-api
npm install
cp .env.example .env
# Edit .env
createdb my_database
npm run migrate
npm run dev
```

## 📄 License

ISC

## 🤝 Contributing

1. Fork the repo
2. Create feature branch
3. Commit changes
4. Create Pull Request

## 📞 Support

- Check troubleshooting section
- Review API_GUIDE.md
- Create issue on GitHub

---

**Built with ❤️ for developers who value clean, maintainable code.**

**Happy coding! 🚀**
