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

export { sendMessage };
