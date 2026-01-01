FROM node:20-alpine

WORKDIR /app

# Installer dépendances UNE SEULE FOIS
COPY package*.json ./
RUN npm install

# Copier le code
COPY . .

EXPOSE 5173 5000
