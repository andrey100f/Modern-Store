# Modern Store - Full Documentation

## Table of Contents
1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Backend](#backend)
4. [Frontend](#frontend)
5. [Infrastructure and Deployment](#infrastructure-and-deployment)
6. [Databases](#databases)
7. [Inter-Service Communication](#inter-service-communication)
8. [Setup and Run](#setup-and-run)
9. [Testing](#testing)
10. [Troubleshooting](#troubleshooting)
11. [Security](#security)
12. [Performance](#performance)

---

## Overview

**Modern Store** is a full-stack e-commerce application built with:
- **Backend**: Java Spring Boot (two services: auth-server and client-server)
- **Frontend**: React (Admin) and Angular (Client)
- **Database**: MongoDB
- **Message Broker**: RabbitMQ
- **Reverse Proxy**: NGINX
- **Containerization**: Docker & Docker Compose

This project provides secure authentication, product management, order processing, and audit logging.

---

## Architecture

### Repository Structure

```
modern-store/
├── backend/
│   ├── auth-server/          # Authentication microservice
│   └── client-server/        # Store microservice (products, orders, users)
├── frontend/
│   ├── admin/                # Admin panel (React + Vite)
│   └── client/               # Client app (Angular)
├── docker/                   # Dockerfiles
├── nginx/                    # NGINX config + SSL certs
├── compose.yaml              # Docker Compose
└── TUTORIAL.md               # Local HTTPS + NGINX guide (Windows)
```

### Communication Flow (High-Level)

```
Client Browser
	└── HTTPS → NGINX Reverse Proxy
						 ├── /           → Angular Client (4200)
						 ├── /admin      → React Admin (5173)
						 └── /api        → Client Server API (8080)

Auth Server (8081) handles authentication and JWT validation
MongoDB stores users, products, orders, audit logs
RabbitMQ handles audit events
```

---

## Backend

### 1) Auth Server (Port 8081)

**Responsibilities**
- User authentication and authorization
- JWT token generation and validation
- Audit log publishing (RabbitMQ)

**Key Packages**
```
auth-server/src/main/java/com/ubb/auth/
├── config/          # Security, RabbitMQ, Liquibase
├── controller/      # REST endpoints
├── service/         # Business logic
├── model/           # Mongo entities
├── repository/      # Mongo repositories
├── exception/       # Global error handling
└── util/            # Seeders and utilities
```

**Main Endpoints (typical)**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /auth/register | Register user |
| POST | /auth/login | Login and get JWT |
| GET | /auth/profile | Current user profile |
| POST | /auth/logout | Logout |
| GET | /auth/validate-token | Validate token |

### 2) Client Server (Port 8080)

**Responsibilities**
- Products CRUD
- Orders management
- User profile & cart
- Store statistics
- Audit logging

**Key Packages**
```
client-server/src/main/java/com/ubb/modernstore/
├── config/          # Security, RabbitMQ, Liquibase
├── controller/      # REST endpoints
├── service/         # Business logic
├── mapper/          # DTO ↔ Entity mapping
├── model/           # Mongo entities
├── repository/      # Mongo repositories
├── aspect/          # AOP
└── exception/       # Global error handling
```

**Main Endpoints (typical)**
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | /api/products | List products | No |
| GET | /api/products/{id} | Product details | No |
| POST | /api/products | Create product | Admin |
| PUT | /api/products/{id} | Update product | Admin |
| DELETE | /api/products/{id} | Delete product | Admin |
| GET | /api/users/{id} | User profile | Yes |
| PUT | /api/users/{id}/cart | Update cart | Yes |
| GET | /api/orders | User orders | Yes |
| POST | /api/orders | Create order | Yes |
| PUT | /api/orders/{id}/cancel | Cancel order | Yes |
| GET | /api/store/stats | Store statistics | Admin |
| GET | /api/audit-logs | Audit logs | Admin |

---

## Frontend

### 1) Admin Panel (React + Vite, Port 5173)

**Tech Stack**
- React 19, TypeScript, Vite
- Tailwind CSS
- React Router
- Axios
- Syncfusion UI components

**Structure**
```
frontend/admin/src/
├── components/
├── pages/
├── contexts/
├── guards/
├── api/
├── App.tsx
└── main.tsx
```

**Routes (key)**
- `/admin/login`
- `/admin/ecommerce`
- `/admin/audit-logs`

### 2) Client App (Angular, Port 4200)

**Tech Stack**
- Angular 20, TypeScript
- RxJS, NgRx Signals
- Angular Material
- Tailwind CSS

**Structure**
```
frontend/client/src/app/
├── pages/
├── components/
├── services/
├── models/
├── interceptors/
├── app.routes.ts
└── ecommerce-store.ts
```

**Routes (key)**
- `/products`
- `/product/:productId`
- `/wishlist`
- `/cart`
- `/checkout`
- `/order-success`

---

## Infrastructure and Deployment

### Docker Compose Services

- `frontend-client` (Angular, 4200)
- `frontend-admin` (React, 5173)
- `client-server` (Spring, 8080)
- `auth-server` (Spring, 8081)
- `mongo` (27017)
- `rabbitmq` (5672, 15672)
- `nginx` (80, 443)

### NGINX (Reverse Proxy)

- HTTPS termination with local SSL
- Routes:
	- `/` → Angular client
	- `/admin` → React admin
	- `/api` → client-server API

For Windows SSL and local hostname setup, see [TUTORIAL.md](TUTORIAL.md).

---

## Inter-Service Communication

RabbitMQ handles audit events.

**Exchange**: `audit-exchange` (topic)

**Queues**
- `auth-audit-queue` → `audit.auth.*`
- `store-audit-queue` → `audit.store.*`

**Flow**
1. Action occurs (e.g., login)
2. Event published to RabbitMQ
3. Consumer stores in `auditlogs` collection
4. Admin UI displays audit trail

---

## Setup and Run

### Prerequisites

- Docker Desktop
- Java 25 (for local builds)
- Node.js 18+
- Maven

### Run with Docker Compose (Recommended)

```
docker compose up -d
docker compose ps
docker compose logs -f
docker compose down
```

**Access**
- Client: http://localhost:4200
- Admin: http://localhost:5173
- API: http://localhost:8080/api
- Auth: http://localhost:8081
- RabbitMQ UI: http://localhost:15672 (rabbit / rabbit)

### Run Locally (No Docker)

**Auth Server**
```
cd backend/auth-server
mvn clean install
mvn spring-boot:run
```

**Client Server**
```
cd backend/client-server
mvn clean install
mvn spring-boot:run
```

**Admin (React)**
```
cd frontend/admin
npm install
npm run dev
```

**Client (Angular)**
```
cd frontend/client
npm install
npm start-local
```

---