import { Request, Response } from "express";
import { ValidateClient } from "../services/Client.Services";

const validateClientsMiddleware = async (
	req: Request,
	res: Response,
	next: Function,
) => {
	const { roomid, readid } = req.headers;
	if (typeof roomid === "string" && typeof readid === "string") {
		const isValid: boolean = await ValidateClient({
			roomdId: roomid,
			readId: readid,
		});
		
		if (!isValid) {
			res.status(401);
			res.json({ error: "not-valid" });
		} else {
			next();
		}
	} else {
		res.status(401);
		res.json({ error: "not-valid" });
	}
};

export default validateClientsMiddleware;
