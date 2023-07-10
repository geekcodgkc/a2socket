import { TOKEN } from "../config";
import { Socket } from "socket.io";

const validate = (socket: Socket): void => {
	if (!socket.handshake.auth.token) {
		socket.disconnect();
		return;
	}

	socket.handshake.auth.token === TOKEN
		? socket.emit("welcome", "welcome")
		: socket.disconnect();
};

export default validate;
