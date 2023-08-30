import { Request, Response } from "express";
import {
	sendMessage,
	salesSevice,
	sendSalesServices,
	getMessagesService,
	deleteMessage
} from "../services/Message.Services";

const createMessage = async (req: Request, res: Response) => {
	try {
		await sendMessage(
			`${req.headers.roomid}`,
			req.body,
			`${req.headers.roomid}`,
		);
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

const getMessages = async (req: Request, res: Response) => {
	try {
		const messages = await getMessagesService(req);
		res.json({ messages });
	} catch (error) {
		res.json({ error });
	}
};

const deleteMessageController = async (req: Request, res: Response) => {
	try {
		const id = req.params.id
		await deleteMessage(id)
	} catch (error) {
		res.json({ error })
	}
}

export { createMessage, askForSales, sendSales, getMessages };
