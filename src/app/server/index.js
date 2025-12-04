import express from "express";
import cors from "cors";
import "reflect-metadata";
import { AppDataSource } from "./app/db/data-source.js";
import paymentRoutes from "./app/routes/payment.routes.js";
AppDataSource.initialize()
  .then(async () => {
    console.log("Database connected successfully.");
    const repo = AppDataSource.getRepository("CardInfo");
    (await repo.count()) === 0 &&
      (await import("./app/migration/card.migration.js")).default();
    //await repo.remove(await repo.find());
  })
  .catch((error) => {
    console.error("Error during Data Source initialization:", error);
  });
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  const paymentRepo = AppDataSource.getRepository("CardInfo");
  const payments = await paymentRepo.find();
  const tokenRepo = AppDataSource.getRepository("PaymentToekn");
  const tokens = await tokenRepo.find();
  const paymentHistoryRepo = await AppDataSource.getRepository("PaymentHistory");
  const paymentHistory = await paymentHistoryRepo.find();
  res.json({payments , tokens , paymentHistory});
});
app.use("/api/payment", paymentRoutes);
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
