import { Request, Response } from "express";
import { sendMessage } from "../services/Message.Services";

const createMessage = async (req: Request, res: Response) => {
	console.log(req.body);
	try {
		await sendMessage(`${req.headers.roomid}`, req.body);
	} catch (error) {
		res.json({ error });
	}
	res.json({ message: "updated" });
};

export { createMessage };
