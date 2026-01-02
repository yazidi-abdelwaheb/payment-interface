import swaggerAutogen from "swagger-autogen";
import fs from "fs";
const doc = {
  info: {
    title: "API Paiement",
    description: "Documentation du backend Paiement App",
  },
  host: "localhost:5000",
  schemes: ["http"],
  tags: [
    { name: "Auth", description: "Authentification admin" },
    { name: "Payment", description: "Gestion des paiements" },
    { name: "Admin Cards", description: "Gestion des cartes" },
  ],
  securityDefinitions: {
    bearerAuth: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description: "Bearer <JWT>",
    },
  },
};

const outputFile = "./swagger-docs/swagger-output.json";
const endpointsFiles = ["./src/server/index.js"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);