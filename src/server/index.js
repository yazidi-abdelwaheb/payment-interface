import express from "express";
import cors from "cors";
import "reflect-metadata";
import { AppDataSource } from "./db/data-source.js";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger-docs/swagger-output.json" assert { type: "json" };

import authRoutes from "./app/routes/auth.routes.js";
import cardRoutes from "./app/routes/card.routes.js";
import paymentRoutes from "./app/routes/payment.routes.js";

// Initialize TypeORM Data Source and create super admin if not exists
AppDataSource.initialize()
  .then(async () => {
    console.log("Database connected successfully.");
    // Create super admin
    const createSuperAdmin = (
      await import("./app/migration/super.migration.js")
    ).default;
    await createSuperAdmin();
  })
  .catch((error) => {
    console.error("Error during Data Source initialization:", error);
  });
const app = express();
app.use(cors());
app.use(express.json());

async () => {
  await import("./swagger-docs/swagger.js");
};

// Swagger
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/api/auth", authRoutes);

app.use("/api/card", cardRoutes);

app.use("/api/payment", paymentRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
