# Hackathon Boilerplate

A reusable full-stack boilerplate for rapid hackathon development.

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Axios
- React Router DOM
- React Hot Toast
- Lucide React
- Recharts

### Backend

- Node.js
- Express
- Prisma ORM
- PostgreSQL (Neon)
- JWT
- Zod
- bcrypt

---

## Folder Structure

```
hackathon-boilerplate/
│
├── client/
├── server/
└── README.md
```

---

## Environment Variables

### Backend (`server/.env`)

```env
DATABASE_URL=
JWT_SECRET=
PORT=3000
```

### Frontend (`client/.env`)

```env
VITE_API_URL=http://localhost:3000
```

---

## Installation

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

---

## Available Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /health | Health Check |
| GET | /api/ping | Verify frontend-backend connection |

---

## Project Structure

### Backend

- config
- controllers
- middleware
- prisma
- routes
- services
- validations
- utils

### Frontend

- api
- assets
- components
- hooks
- layouts
- pages
- routes
- utils