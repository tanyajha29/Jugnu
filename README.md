# Jugnu

Jugnu is an emotionally intelligent AI companion that helps users navigate difficult phases with calm, adaptive guidance.

## Tech Stack
- React + Vite + Tailwind
- Node.js + Express
- Prisma + PostgreSQL
- Ollama (AI)
- Docker

## Repo Structure
- `client/` frontend (React + Vite)
- `server/` backend (Express + Prisma)
- `docker/` Docker and compose files

## Quick Start (Docker)
1. Create `.env` at repo root (or copy from `.env.example`) and set real secrets.
2. Start stack:
```bash
docker compose --env-file .env -f docker/docker-compose.yml up --build -d
```
3. App: `http://localhost:5173`
4. Stop:
```bash
docker compose --env-file .env -f docker/docker-compose.yml down
```

## Local Dev (Frontend + Docker Backend)
1. Start Postgres + Backend:
```bash
docker compose --env-file .env -f docker/docker-compose.yml up -d postgres backend
```
2. Run frontend:
```bash
cd client
npm install
npm run dev
```

## Local Dev (All Local)
1. Ensure local Postgres is running and `jugnu_db` exists.
2. Update `server/.env` to point to local DB:
```
DATABASE_URL=postgresql://postgres:root@localhost:5432/jugnu_db
```
3. Run migrations:
```bash
cd server
npx prisma migrate dev
```
4. Start backend:
```bash
npm start
```
5. Start frontend:
```bash
cd ../client
npm install
npm run dev
```

## Common Issues
- Always use `--env-file .env` with Docker compose or env vars will be empty.
- Don’t run local backend on port `5000` while Docker backend is running.
- If Prisma errors, confirm DB is reachable and migrations are applied.

## Environment Variables
- `PORT`
- `JWT_SECRET`
- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `POSTGRES_DB`
- `DATABASE_URL`
- `OLLAMA_URL`
- `OLLAMA_MODEL`
- `OLLAMA_TIMEOUT_MS`
- `VITE_API_URL`
