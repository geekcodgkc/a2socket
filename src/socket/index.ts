import { Socket } from "socket.io";
import validate from "../utils/validateToken";
import { ValidateClient } from "../services/Client.Services";
import {} from "../services/Message.Services";

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

	socket.on("disconnect", async () => {
		console.log(`dis ${socket.handshake.auth.readID}`);
	});
};

export default socketHandler;
