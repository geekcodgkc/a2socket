import { Request } from "express";
import { io } from "../app";
import MessageModel from "../models/Message.Model";
import ClientModel from "../models/Clients.Model";

/*
	envia mensajes para actualizar la cola atravez del socket
	y guarda el mensaje en la cola esperando que
*/
const sendMessage = async (
	roomId: string,
	message: string | object | Array<string | object>,
	readId: string,
) => {
	try {
		const newMessage = await MessageModel.create({
			message,
			roomId,
			reads: [readId],
		});
		io.to(roomId).emit("updateData", newMessage.toJSON());
	} catch (error) {
		console.log(error);
	}
};

/*
	solicita a los branch que recopilen los datos
	y sean enviado al mainBranch
*/

interface salesServiceInterface {
	roomId: string;
	cierre?: boolean;
}

const salesSevice = async ({
	roomId,
	cierre = false,
}: salesServiceInterface) => {
	io.to(roomId).emit("syncSales", { cierre });
};

/*
	envia los datos de ventas de los branch
	para el mainBranch
	al room que corresponde al branch especifico
*/
const sendSalesServices = async (
	roomId: string,
	message: string | object | Array<string | object>,
) => {
	io.to(roomId).emit("giveSales", message);
};

const getMessagesService = async (req: Request) => {
	console.log(req.params, req.headers);
	if (!req.params.all) {
		const messages = await MessageModel.find({ roomId: req.headers.roomid });
		return messages;
	}
	const messages = await MessageModel.find();
	return messages;
};

const getClientQueue = async (roomId: string) => {
	const queue = await MessageModel.find({ roomId });
	io.to(roomId).emit("sync", queue);
};

export {
	sendMessage,
	salesSevice,
	sendSalesServices,
	getMessagesService,
	getClientQueue,
};
