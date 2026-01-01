import { Router } from "express";
import Controller from "../controller/auth.controller.js";

const router = Router();

router.post("/login", Controller.login);

export default router;
