import { Request, Response } from "express";
import {
	sendMessage,
	salesSevice,
	sendSalesServices,
} from "../services/Message.Services";
import MessageModel from "../models/Message.Model";
import { ValidateClient } from "../services/Client.Services";

const createMessage = async (req: Request, res: Response) => {
	const { roomid, readid } = req.headers;
	if (typeof roomid === "string" && typeof readid === "string") {
		const isValid = await ValidateClient({
			roomdId: roomid,
			readId: readid,
		});

		if (!isValid) {
			res.json({ error: "not-valid" });
			return;
		}
	}
	try {
		console.log("message queued");
		await sendMessage(`${req.headers.roomid}`, req.body);
	} catch (error) {
		res.json({ error });
	}
	res.json({ message: "updated" });
};

const askForSales = async (req: Request, res: Response) => {
	const { roomid, readid } = req.headers;
	if (typeof roomid === "string" && typeof readid === "string") {
		const isValid = await ValidateClient({
			roomdId: roomid,
			readId: readid,
		});

		if (!isValid) {
			res.json({ error: "not-valid" });
			return;
		}
	}
	try {
		await salesSevice(`${req.headers.roomid}`);
	} catch (error) {
		res.json({ error });
	}
	res.json({ message: "ask for update sended" });
};

const sendSales = async (req: Request, res: Response) => {
	const { roomid, readid } = req.headers;
	if (typeof roomid === "string" && typeof readid === "string") {
		const isValid = await ValidateClient({
			roomdId: roomid,
			readId: readid,
		});

		if (!isValid) {
			res.json({ error: "not-valid" });
			return;
		}
	}
	try {
		await sendSalesServices(`${req.headers.roomid}`, req.body);
	} catch (error) {
		res.json({ error });
	}
	res.json({ message: "ask for update sended" });
};

export { createMessage, askForSales, sendSales };
