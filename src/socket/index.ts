import { Socket } from "socket.io";
import validate from "../utils/validateToken";
import { ValidateClient } from "../services/Client.Services";
import { getClientQueue } from "../services/Message.Services";

const socketHandler = (socket: Socket) => {
	validate(socket);
	ValidateClient({
		roomdId: socket.handshake.auth.roomID,
		readId: socket.handshake.auth.readID,
	}).then((valid) => {
		if (valid) {
			socket.join(socket.handshake.auth.roomID);
			return;
		}
		socket.disconnect();
	});

	socket.on("syncQueue", () => {
		getClientQueue(socket.handshake.auth.roomID);
	});

	socket.on("disconnect", () => {
		console.log(`dis ${socket.handshake.auth.readID}`);
	});

	socket.on("OK", (e) => console.log(e));
};

export default socketHandler;
