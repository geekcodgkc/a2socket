import { io } from "../app";

/*
	envia mensajes para actualizar la cola atravez del socket
	y guarda el mensaje en la cola esperando que
*/
const sendMessage = async (
	roomId: string,
	message: string | object | Array<string | object>,
) => {
	io.to(`${roomId}`).emit("newOrder", message);
};

const sendDraft = async (roomId: string) => {
	io.to(`${roomId}`).emit("draft", { "001": "qty:1" });
};

const updateDraft = async (
	roomId: string,
	data: string | object | Array<string | object>,
) => {
	io.to(`${roomId}`).emit("draft", data);
};

export { sendMessage, sendDraft, updateDraft };
