import { Router } from "express";
import { createMessage, askForSales } from "../controllers/queue.controller";

const router = Router();

router.post("/", createMessage);
router.get("/sales", askForSales)

export { router };
