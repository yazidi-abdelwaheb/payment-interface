# 📘 Payment Full Stack App — React + TypeScript + Vite (Client) + Node.js + Express + SQLite (Server)

![Node.js](https://img.shields.io/badge/Node.js-20.17.0-green)
![React](https://img.shields.io/badge/React-18.2.0-blue)

---

## 🌟 Project Overview / Description

This project is a full-stack **payment management application** designed to handle:

- Admin authentication  
- Card management  
- Payment processing  

It provides a modern, responsive UI with React on the frontend, and a secure REST API with Express.js on the backend.  
The API is documented with Swagger for easy integration and testing.

---

## 🏗 Project Structure

```
payment-interface/
├─ src/
│ ├─ client/ # Frontend React
│ │ ├─ app/ # React components and pages
│ │ ├─ App.tsx
│ │ ├─ main.tsx
│ │ └─ index.css
│ ├─ server/ # Backend Express
│ │ ├─ app/ # Routes and controllers
│ │ ├─ db/ # Database configuration and connection
│ │ ├─ swagger-docs/ # Swagger API documentation
│ │ └─ index.js # Express server entry point
│ └─ public/ # Static assets
├─ .gitignore
├─ dockerfile
├─ docker-compose.yml
├─ docker-compose.prod.yml
├─ package.json # Project dependencies
└─ README.md
```
---

## 🛠 Technologies Used

| Side     | Technology                 | Description                                      |
|----------|----------------------------|--------------------------------------------------|
| Frontend | React + Vite + Tailwind CSS | Modern, fast, and responsive SPA                |
| Backend  | Express.js + JWT + TypeORM  | Full REST API with authentication               |
| Database | SQLite                      | Stores users, cards, and payments               |
| API Docs | Swagger / swagger-autogen   | Automatic API documentation                     |
| Others   | Node.js, npm                | Dependency management and server execution      |

---

## ⚡ Installation

1. Clone the repository:

```bash
git clone https://github.com/yazidi-abdelwaheb/payment-interface.git
cd payment-interface
```

2. Install dependencies:
```bash
npm install
```

## 🚀 Run the Project
```bash
npm run dev
```
The frontend runs on http://localhost:5173 .

The backend API runs on http://localhost:3000 .

---

## 📄 API Documentation

Swagger documentation is available for testing all endpoints:

  After starting the server, visit:
  http://localhost:3000/api/docs
