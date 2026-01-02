import express from "express";
import cors from "cors";
import "reflect-metadata";
import { AppDataSource } from "./db/data-source.js";
import swaggerUi from "swagger-ui-express";
import fs from "fs";

import authRoutes from "./app/routes/auth.routes.js";
import cardRoutes from "./app/routes/card.routes.js";
import paymentRoutes from "./app/routes/payment.routes.js";

// Read Swagger JSON safely
const swaggerFile = JSON.parse(
  fs.readFileSync("src/server/swagger-docs/swagger-output.json", "utf8")
);

const app = express();
app.use(cors());
app.use(express.json());

// Initialize DB
AppDataSource.initialize()
  .then(async () => {
    console.log("Database connected successfully.");
    const createSuperAdmin = (
      await import("./app/migration/super.migration.js")
    ).default;
    await createSuperAdmin();
  })
  .catch((error) => {
    console.error("Error during Data Source initialization:", error);
  });

async function generateSwaggerDocs() {
  await import("./swagger-docs/swagger.js");
};

//await generateSwaggerDocs();
// Swagger
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/card", cardRoutes);
app.use("/api/payment", paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
