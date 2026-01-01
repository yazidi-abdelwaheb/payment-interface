import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "API Paiement",
    description: "Documentation automatique du backend Paiement",
  },
  host: "localhost:3000",
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

swaggerAutogen()(outputFile, endpointsFiles, doc);