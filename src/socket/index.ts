import { Socket } from "socket.io";
import validate from "../utils/validateToken";
import { SOCKET_PORT } from "../config";

const socketHandler = (socket: Socket) => {
	console.log("socket running on port ", SOCKET_PORT);
	validate(socket);
	socket.join(socket.handshake.auth.joinID);

	socket.on("update", ({ data, room }) => {
		console.log(socket.rooms);
		socket.in(room).emit("updateData", data);
	});

	socket.on("disconnect", () => {
		console.log("dis");
	});

	socket.on("OK", (e) => console.log(e));
};

export default socketHandler;
