# Pevu Social Commerce Monorepo

This is the monorepo for **Pevu**, a social commerce platform with buyers, sellers, and admin roles, built with Java Spring Boot microservices and a Next.js frontend.

## Structure

- `backend/` - Java Spring Boot microservices (Gradle Kotlin DSL)
- `frontend/pevu-client/` - Next.js 14+ frontend
- `infra/docker/` - Docker, Docker Compose, NGINX, MinIO, Certbot

## Quick Start (Local)

1. Clone the repo
2. Copy `.env.example` to `.env` and fill secrets
3. Run: `docker compose -f infra/docker/docker-compose.yml up --build`
4. Access:
   - Frontend: http://localhost:3000
   - API Gateway: http://localhost/api
   - MinIO: http://localhost:9000

## Initial Admin
- Email: eugenemoyale451@gmail.com
- Password: (set in .env)

## Services
- Auth, Product, Media, User, Order, Cart, Social, Review, Admin, etc.

---

See each service's README for API details. 