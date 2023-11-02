import { Request, Response } from "express";
import { TOKEN } from "../config";

const validateMiddleware = (req: Request, res: Response, next: Function) => {
	console.log("middleware: ", req.headers);

	const token = req.headers.authorization?.split(" ")[1];
	if (token) {
		if (token === TOKEN) {
			next();
			return;
		}
		res.status(401);
	}

	res.json({ message: "unauthorized" });
};

export default validateMiddleware;
