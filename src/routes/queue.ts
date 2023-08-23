import { Router } from "express";
import { createMessage, askForSales, sendSales } from "../controllers/queue.controller";

const router = Router();

router.post("/", createMessage);
router.get("/sales", askForSales)
router.post("/sales", sendSales)

export { router };
