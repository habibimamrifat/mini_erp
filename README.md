# Mini ERP Backend

Mini ERP Backend is a modular Node.js and TypeScript REST API for managing core ERP operations such as authentication, users, roles, permissions, products, sales, and analytics. The application is designed with a clean modular structure and includes permission-based route protection, image uploads, Swagger documentation, and database seeding.

## Features

- Authentication and authorization with JWT
- Role and permission management
- User management with access control
- Product management with image upload support
- Sales tracking and management
- Analytics endpoints
- Swagger API documentation
- Database seeding for initial roles and admin user

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB with Mongoose
- JWT for authentication
- Multer and Cloudinary for file uploads
- Swagger for API documentation
- bcrypt and zod for security and validation

## Project Structure

```text
src/
  app/
    config/
    middlewares/
    modules/
      auth/
      users/
      roles/
      permissions/
      rolePermissionBlueprint/
      product/
      makeSells/
      analatycs/
    registry/
    routes/
    seed/
    services/
    utils/
  server.ts
  app.ts
```

## Prerequisites

Before running the project, make sure you have:

- Node.js 18+ installed
- MongoDB running locally or remotely
- npm or yarn installed

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the project root and configure the required environment variables.

## Environment Variables

Example configuration:

```env
PORT=5000
DATABASE_URL=mongodb://127.0.0.1:27017/mini-erp

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d

JWT_ACCESS_SECRET=your_access_secret
JWT_ACCESS_EXPIRES_IN=1d

JWT_REFRESH_SECRET=your_refresh_secret
JWT_REFRESH_EXPIRES_IN=7d

ADMIN_EMAIL=admin@mini-erp.com
ADMIN_PHONE=01710000000
ADMIN_PASSWORD=admin1234

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Running the Project

### Development mode

```bash
npm run dev
```

### Build the project

```bash
npm run build
```

### Start the production build

```bash
npm start
```

### Seed initial data

```bash
npm run seed
```

## API Overview

The application exposes its API under:

- Base URL: `/api/v1`
- Swagger Docs: `/api-docs`

### Main modules

- `/auth` — login and authentication
- `/users` — user management
- `/roles` — role management
- `/permissions` — permission management
- `/role-permissions-blueprint` — role-permission blueprint management
- `/products` — product CRUD and analytics
- `/sells` — sales operations
- `/analytics` — analytics endpoints

## Notes

- Some routes are protected using authentication and access-control middleware.
- Default roles, permissions, and an admin account can be seeded through the provided scripts.
- The API returns a consistent response structure with success, message, statusCode, and data fields.

## License

This project is licensed under the ISC License.
