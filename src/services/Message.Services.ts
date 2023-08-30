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
	try {
		const sales = await MessageModel.create({
			message,
			roomId,
			reads: [],
			toMain: true
		});
		io.to(roomId).emit("giveSales", sales.toJSON());
	} catch (error) {
		console.log(error);
	}
};

const getMessagesService = async (req: Request) => {
	if (!req.params.all) {
		try {
			const messages = await MessageModel.find({ roomId: req.headers.roomid });
			return messages;
		} catch (error) {
			throw new Error(`${error}`);
		}
	}
	try {
		const messages = await MessageModel.find();
		return messages;
	} catch (error) {
		throw new Error(`${error}`);
	}
};

const getClientQueue = async (roomId: string, readID: string) => {
	const room = await ClientModel.findById(roomId)
	if(room) {
		room.toJSON()
		if(readID === room._id.toString()) {	
			const queue = await MessageModel.find({ roomId });
			io.to(roomId).emit("queue", queue);
		} else {
			const queue = await MessageModel.find({ roomId, toMain: false });
			io.to(roomId).emit("queue", queue);
		}
	} else {
		const queue = await MessageModel.find({ roomId });
		io.to(roomId).emit("queue", queue);
	}
};

const addReadMessage = async (
	roomId: string,
	messageId: string,
	readerId: string,
) => {
	try {
		const message = await MessageModel.findById(messageId);
		const room = await ClientModel.findById(roomId);

		room?.toJSON();
		const allReaders = new Set();
		room && allReaders.add(room._id);
		room?.branchs.forEach((b) => allReaders.add(b._id));

		const currentReads = new Set();
		message?.reads.forEach((r) => {
			currentReads.add(r);
		});
		currentReads.add(readerId);

		if (currentReads.size === allReaders.size) {
			await MessageModel.findByIdAndDelete(messageId);
			return;
		}

		const reads = [];
		for (const reader of currentReads.values()) {
			reads.push(reader);
		}

		const updatedMessage = {
			reads,
		};

		await MessageModel.findByIdAndUpdate(messageId, updatedMessage);
	} catch (error) {
		throw new Error(`${error}`);
	}
};

const deleteMessage = async (id: string) => {
	try {
		await MessageModel.findByIdAndRemove(id);
		return `message with id: ${id} was removed`
	} catch (error) {
		console.log(error);
	}
};

export {
	sendMessage,
	salesSevice,
	sendSalesServices,
	getMessagesService,
	getClientQueue,
	addReadMessage,
	deleteMessage,
};
