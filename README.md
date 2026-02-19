# Jugnu

Jugnu is an emotionally intelligent operating system that helps users navigate difficult phases with calm, adaptive guidance.

## Tech Stack
- React + Vite
- Node.js + Express
- Prisma + PostgreSQL
- Ollama (AI)
- Docker

## Repo Structure
- `client/` frontend (React + Vite)
- `server/` backend (Express + Prisma)
- `docker/` Docker and compose files

## Docker (Production)
1. Create `.env` from `.env.example` at the repo root and set real secrets.
2. Build and start:
```bash
docker compose --env-file .env -f docker/docker-compose.yml up --build -d
```
3. Open the app:
```bash
http://localhost:5173
```
4. Stop:
```bash
docker compose --env-file .env -f docker/docker-compose.yml down
```

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
