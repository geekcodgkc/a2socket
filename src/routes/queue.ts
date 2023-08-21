import { Router } from "express";
import { createMessage } from "../controllers/queue.controller";

const router = Router();

router.post("/", createMessage);

export { router };
