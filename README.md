# 📊 Sales CRM Backend

A powerful and modular Sales CRM system built with **NestJS**, **PostgreSQL**, and **Socket.IO**. It helps manage leads, deals, stages, orders, and provides real-time updates to users.

## 🚀 Tech Stack

- **Backend Framework:** [NestJS](https://nestjs.com/)
- **Database:** PostgreSQL
- **WebSockets:** Socket.IO (via NestJS Gateways)
- **ORM:** TypeORM
- **Authentication:** JWT-based

---

## 📦 Project Structure

src/
├── common/ # Common
├── config/ # Config
├── database/ # DB config & connection module
├── i18n/ # App translate module
├── middleware/ # Middlewares
├── modules/ # All modules
├── seeder/ # Startup data
├── socket.io/ # Realtime module
├── utils/ # Utils
├── test/ # Test modules
└── main.ts # Entry point

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/sales-crm-backend.git
cd sales-crm-backend
```

### Install dependencies

```
npm install
```

### Setup .env file

```
PORT=
NODE_ENV=
SECRET_JWT=

DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=
```

### Create the PostgreSQL database

```
CREATE DATABASE your_db_name;
```
