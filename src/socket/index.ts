import { Socket } from "socket.io";
import validate from "../utils/validateToken";
import { ValidateClient } from "../services/Client.Services";
import {
	addReadMessage,
	deleteMessage,
	getClientQueue,
} from "../services/Message.Services";
import { SocketLogger } from "../services/Logger.Services";

const socketHandler = (socket: Socket) => {
	validate(socket);
	ValidateClient({
		roomdId: socket.handshake.auth.roomID,
		readId: socket.handshake.auth.readID,
	})
		.then((valid) => {
			if (valid) {
				socket.join(socket.handshake.auth.roomID);
				return;
			}
			socket.disconnect();
		})
		.catch((e) => console.log(e));

	socket.on("syncQueue", async () => {
		const syncQueue = 'syncQueue' 
		await SocketLogger(socket.handshake.auth, {}, "syncQueue", {syncQueue})
		getClientQueue(socket.handshake.auth.roomID, socket.handshake.auth.readID);
	});

	socket.on("read", async (messageId) => {
		const read = 'read'
		await SocketLogger(socket.handshake.auth, {messageId}, read, {read})

		addReadMessage(
			socket.handshake.auth.roomID,
			messageId,
			socket.handshake.auth.readID,
		);
	});

	socket.on("readSale", async (messageId) => {
		const readSale = 'readSale'
		await SocketLogger(socket.handshake.auth, {messageId}, readSale, {readSale})

		deleteMessage(messageId);
	});

	socket.on("disconnect", async () => {
		const disconnect = 'disconnect'
		await SocketLogger(socket.handshake.auth, {}, disconnect, {disconnect})
		console.log(`dis ${socket.handshake.auth.readID}`);
	});
};

export default socketHandler;
