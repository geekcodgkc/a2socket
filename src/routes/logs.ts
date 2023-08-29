import { Router } from "express";
import validateMiddleware from "../middlewares/validateMiddleware";
import { getLogs } from "../controllers/logger.controllers";

const router = Router();

router.get("/all", validateMiddleware, getLogs);

export { router };
