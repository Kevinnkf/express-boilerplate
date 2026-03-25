# Express.js API Boilerplate

> Express.js server boilerplate with Sequelize ORM, PostgreSQL, JWT authentication, error handling, input validation, structured logging, and industry best practices pre-configured.

[![Node.js](https://img.shields.io/badge/Node-14%2B-green)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-blue)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-12%2B-blue)](https://www.postgresql.org/)
[![Sequelize](https://img.shields.io/badge/Sequelize-6.x-success)](https://sequelize.org/)

## Quick Start

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

API is running at `http://localhost:3005`
