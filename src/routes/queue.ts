import { Router } from "express";
import {
	createMessage,
	askForSales,
	sendSales,
} from "../controllers/queue.controller";
import validateMiddleware from "../middlewares/validateMiddleware";

const router = Router();

router.post("/", validateMiddleware, createMessage);
router.get("/sales", validateMiddleware, askForSales);
router.post("/sales", validateMiddleware, sendSales);

export { router };
