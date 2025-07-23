# DevOdyssey Server

The backend Node.js application for DevOdyssey - a RESTful API built with Express.js, MongoDB, and JWT authentication.

## Overview

This is the server-side application that provides the API endpoints and business logic for the DevOdyssey blog platform. Built with Node.js, Express.js, and MongoDB for scalable and efficient backend operations.

## Technology Stack

- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, unopinionated web framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing and encryption
- **Cors** - Cross-Origin Resource Sharing middleware

## Features

- **RESTful API**: Clean and consistent API endpoints
- **Authentication & Authorization**: JWT-based secure authentication
- **Error Handling**: Centralized error handling middleware
- **Database**: MongoDB with Mongoose for data modeling
- **Logging**: Request logging and error tracking
- **Environment Configuration**: Flexible environment-based configuration

## Project Structure

```bash
server/
├── src/
│   ├── controllers/        # Route controllers
│   │   ├── blogController.js
│   │   └── userController.js
│   ├── db/        # Database connection
│   │   └── connection.db.js
│   ├── models/             # Mongoose models
│   │   ├── user.model.js
│   │   └── blogs.model.js
│   ├── routes/             # Express routes
│   │   ├── auth.js
│   │   ├── blogs.routes.js
│   │   └── user.routes.js
│   ├── middleware/         # Custom middleware
│   │   ├── auth.middleware.js
│   │   └── error.middleware.js
│   ├── utils/              # Utility functions
│   │   ├── asyncHandler.utility.js
│   │   └── errorHandler.utility.js
│   └── app.js              # Express app configuration
├── .gitignore
├── package.json
├── server.js               # Server entry point
└── README.md               # This file
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas)
- Git

### Installation

1. **Navigate to the server directory**

   ```bash
   cd server
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   Create a `.env` file in the server directory:

   ```env
   # Server Configuration
   NODE_ENV=development
   PORT=5000
   
   # Database
   MONGODB_URI=mongodb://localhost:27017/devodyssey
   
   # JWT Configuration
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRE=7d
   
   # Client URL
   CLIENT_URL=http://localhost:5173
   ```

4. **Start MongoDB**

   Make sure MongoDB is running on your system:

   ```bash
   # If using local MongoDB
   mongod
   
   # Or start MongoDB service
   sudo systemctl start mongod
   ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

6. **Access the API**
   - API Base URL: <http://localhost:5000/api/v1>

## Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm run start` - Start production server
- `npm run test` - Run test suite
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix linting issues automatically
- `npm run seed` - Seed database with sample data (if implemented)

## API Endpoints

### Authentication Routes

```
POST   /api/v1/users/register                # User registration
POST   /api/v1/users/login                   # User login
POST   /api/v1/users/logout                  # User logout
```

### Blog Routes

```
GET    /api/v1/blogs              # Get all blog posts
GET    /api/v1/blogs/:id          # Get single blog post
POST   /api/v1/blogs              # Create new blog post (Auth required)
PUT    /api/v1/blogs/:id          # Update blog post (Auth required)
DELETE /api/v1/blogs/:id/delete   # Delete blog post (Auth required)
GET    /api/v1/blogs/search       # Search blog posts
```

### User Routes

```
GET    /api/v1/users/get-profile            # Get user profile (Auth required)
PUT    /api/v1/users/update-profile/:id     # Change profile (Auth required)
DELETE /api/v1/users/delete-account         # Delete user account (Auth required)
```
---

For frontend setup and folder structure documentation, see the [client README](../client/README.md).