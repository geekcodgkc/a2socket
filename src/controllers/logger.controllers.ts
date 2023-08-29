import { Request, Response, response } from "express";
import { getLogger } from "../services/Logger.Services";

const getLogs = async (_req: Request, res: Response) => {
	try {
		const logs = await getLogger();
		res.json({ logs });
	} catch (error) {
		res.status(500);
		res.json({ error });
	}
};

export { getLogs };
