import { Router } from "express";
import PaymentController from "../controller/payment.controller.js";

const router = Router();
router.post("/", PaymentController.payment);
router.get("/check-id-token/:id", PaymentController.checkIdToken);
router.post("/check-code/:id", PaymentController.checkCode);

export default router;