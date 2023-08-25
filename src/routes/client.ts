import { Router } from "express";
import {
	createClient,
	updateClient,
	deleteClient,
	getClient,
	getClients,
} from "../controllers/client.controller";
import validateMiddleware from "../middlewares/validateMiddleware";

const router = Router();

router.post("/", validateMiddleware, createClient);
router.get("/", validateMiddleware, getClients);
router.get("/:id", validateMiddleware, getClient);
router.delete("/:id", validateMiddleware, deleteClient);
router.put("/:id", validateMiddleware, updateClient);

export { router };
