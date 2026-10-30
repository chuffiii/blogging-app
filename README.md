# Blog App

A full-stack Medium-like blogging application where users can sign up, sign in, create blog posts, view published blogs, and read individual posts.

The application is built with **React and TypeScript** on the frontend and **Hono running on Cloudflare Workers** on the backend. It uses **PostgreSQL with Prisma ORM and Cloudflare Hyperdrive** for database access and **JWT** for authentication.

## Live Demo

👉 https://blogging-app-ten-taupe.vercel.app/

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Axios
- React Router

### Backend

- Hono
- Cloudflare Workers
- TypeScript
- JWT Authentication
- CORS

### Database & Validation

- PostgreSQL (Neon)
- Prisma ORM
- Cloudflare Hyperdrive
- Zod

## Features

- User registration
- User login
- JWT-based authentication
- Create blog posts
- View all blog posts
- View individual blog posts
- Display author information
- Display post creation date
- Input validation using Zod
- REST API built with Hono
- PostgreSQL database integration
- Responsive UI using Tailwind CSS

## Architecture

```text
                ┌─────────────────────┐
                │      React          │
                │     Frontend        │
                │    TypeScript       │
                └──────────┬──────────┘
                           │
                         Axios
                           │
                           ▼
                ┌─────────────────────┐
                │ Hono + Cloudflare   │
                │      Workers        │
                └──────────┬──────────┘
                           │
                      Prisma ORM
                           │
                           ▼
                ┌─────────────────────┐
                │ Cloudflare          │
                │ Hyperdrive          │
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │ PostgreSQL (Neon)   │
                └─────────────────────┘
```

## Authentication Flow

1. User signs up or signs in.
2. Backend validates the request using Zod.
3. Backend generates a JWT.
4. JWT is returned to the frontend.
5. Frontend stores the JWT in `localStorage`.
6. Protected API requests send the JWT using the `Authorization` header.
7. Backend verifies the JWT before allowing authenticated operations.

## Database Connection

The application uses **Neon PostgreSQL** as its database and **Cloudflare Hyperdrive** for database connection pooling.

- Hyperdrive manages the database connection between Cloudflare Workers and Neon.
- Prisma ORM is used to perform database operations.
- The database connection string is configured in Cloudflare Hyperdrive rather than being stored directly in the Worker configuration.
- The Worker accesses the connection through the `HYPERDRIVE` binding.
