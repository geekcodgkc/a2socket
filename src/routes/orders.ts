import { Router } from "express";
import { createMessage } from "../controllers/queue.controller";
import validateMiddleware from "../middlewares/validateMiddleware";

const router = Router();

router.post("/", validateMiddleware, createMessage);

export { router };
