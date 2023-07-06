import { Request, Response } from "express";

const validateMiddleware = (req: Request, res: Response, next: Function) => {
	next();
};

export default validateMiddleware;
