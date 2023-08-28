import { Router } from "express";
import {
	createMessage,
	askForSales,
	sendSales,
	getMessages,
} from "../controllers/queue.controller";
import validateMiddleware from "../middlewares/validateMiddleware";
import validateClientsMiddleware from "../middlewares/validateClientsMiddleware";

const router = Router();

router.post("/", validateMiddleware, validateClientsMiddleware, createMessage);

router.get("/", validateMiddleware, validateClientsMiddleware, getMessages);

router.get(
	"/sales",
	validateMiddleware,
	validateClientsMiddleware,
	askForSales,
);

router.post("/sales", validateMiddleware, validateClientsMiddleware, sendSales);

export { router };
