import { Request, Response } from "express";
import { sendMessage, salesSevice, sendSalesServices } from "../services/Message.Services";

const createMessage = async (req: Request, res: Response) => {
	console.log(req.body);
	try {
		await sendMessage(`${req.headers.roomid}`, req.body);
	} catch (error) {
		res.json({ error });
	}
	res.json({ message: "updated" });
};

const askForSales = async (req: Request, res: Response) => {
	try {
		await salesSevice(`${req.headers.roomid}`);
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
