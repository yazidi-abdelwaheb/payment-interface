import { Router } from "express";
import Controller from "../controller/card.controller.js";
const router = Router();

router.get("/", Controller.list);
router.get("/:id", Controller.getOne);
router.post("/", Controller.createOne);
router.put("/:id", Controller.updateOne);
router.patch('/:id', Controller.addAmount);

export default router;
