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
