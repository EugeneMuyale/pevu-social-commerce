# Auth Service

Handles registration, login, JWT, and role assignment for Pevu.

## Features
- Register/login (email, phone)
- JWT tokens
- Role assignment (buyer, seller, admin)
- Business registration document upload

## Setup

- Build: `./gradlew bootJar`
- Run: `./gradlew bootRun` or via Docker

## Environment
- DB: PostgreSQL (see application.yml)
- JWT secret: set in application.yml or env 