import { Request, Response } from "express";
import {
	sendMessage,
	salesSevice,
	sendSalesServices,
} from "../services/Message.Services";
import MessageModel from "../models/Message.Model";

const createMessage = async (req: Request, res: Response) => {
	try {
		console.log("message queued");
		await sendMessage(`${req.headers.roomid}`, req.body);
	} catch (error) {
		res.json({ error });
	}
	res.json({ message: "updated" });
};

const askForSales = async (req: Request, res: Response) => {
	console.log(req.params, req.query);
	try {
		await salesSevice({
			roomId: `${req.headers.roomid}`,
			cierre: req.query.cierre ? true : false,
		});
	} catch (error) {
		res.json({ error });
	}
	res.json({ message: "ask for update sended" });
};

const sendSales = async (req: Request, res: Response) => {
	try {
		await sendSalesServices(`${req.headers.roomid}`, req.body);
	} catch (error) {
		res.json({ error });
	}
	res.json({ message: "ask for update sended" });
};

export { createMessage, askForSales, sendSales };
