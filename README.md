📘 Documentation du Projet
Full Stack App — React + TypeScript + Vite (Client) + Node.js + Express + SQLite (Server)

Ce projet est une application full-stack composée d’un client front-end développé avec React + TypeScript + Vite, et d’un serveur back-end basé sur Node.js + Express utilisant une base de données SQLite.

L’objectif est de fournir une architecture simple, rapide et facile à déployer.

🏗️ 1. Technologies utilisées
🎨 Frontend (client)

React

TypeScript

Vite

Fetch API (pour appeler le serveur)

🚀 Backend (server)

Node.js

Express

SQLite3

📁 2. Structure du projet
root/
│
├── client/               # Application React + TS + Vite
│   ├── src/
│   ├── index.html
│   └── package.json
│
├── server/               # API Node.js + Express + SQLite
│   ├── index.js          # Point d'entrée du serveur
│   ├── database.js       # Connexion SQLite
│   ├── routes/           # Routes API
│   └── package.json
│
└── README.md             # Documentation du projet

⚙️ 3. Installation

Clone le projet puis installe les dépendances.

📦 Installer le client
cd client
npm install

📦 Installer le serveur
cd server
npm install

▶️ 4. Lancer l’application
🖥️ Lancer le client (React + Vite)

Depuis le dossier client :

npm run dev


➡️ Le client démarre sur :
📍 http://localhost:5173

🌐 Lancer le serveur (Express)

Depuis le dossier server :

npm run dev


ou

node index.js


➡️ Le serveur démarre sur :
📍 http://localhost:5000

🔗 5. Communication Client ↔ Serveur

Le client communique avec le serveur via l’API Express.

Exemple avec fetch :

fetch("http://localhost:5000/api/data")
  .then(res => res.json())
  .then(data => console.log(data));

🗄️ 6. Base de données SQLite

Le serveur utilise un fichier SQLite local situé ici :

server/database.db


Il est automatiquement créé si absent.

Exemple d’usage dans database.js :

const db = new sqlite3.Database("./database.db");

🧩 7. Exemple de route Express

Exemple dans server/index.js :

app.get("/api/users", (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

🧪 8. Tests de l’API

Exemples de requêtes (Postman, ThunderClient, curl) :

GET http://localhost:5000/api/users


Retour attendu :

[
  { "id": 1, "name": "John" }
]

🤝 9. Contribution

Fork du projet

Créer une nouvelle branche

Ajouter vos modifications

Créer une Pull Request
