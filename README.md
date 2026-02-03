# RiskWall Revamp Monorepo

This monorepo uses **Turborepo** to manage the React UI and the NestJS Backend.

## 📁 Structure

- `apps/ui`: React 19 Frontend (Vite)
- `apps/api`: NestJS Backend
- `migrations/`: Flyway SQL migrations
- `docker-compose.yml`: PostgreSQL and Flyway setup

## 🚀 Getting Started

### 1. Start Database and Migrations
Ensure Docker is running, then start the database and run migrations:
```bash
docker-compose up -d
```

### 2. Install Dependencies
From the root directory:
```bash
npm install
```

### 3. Run Development Servers
Start both the Frontend and Backend in development mode:
```bash
npm run dev
```

## 🛠 Tech Stack

### Backend (apps/api)
- **NestJS** with TypeScript
- **TypeORM** for PostgreSQL
- **Swagger (OpenAPI)** at `/api/docs`
- **Flyway** for database migrations

### Frontend (apps/ui)
- **React 19** with Vite
- **Tailwind CSS**
- **React Query**
