import express from "express";
import cors from "cors";
import morgan from "morgan";
import validateMiddleware from "./middlewares/validateMiddleware";
import { Server } from "socket.io";
import { SOCKET_PORT, PORT } from "./config";
import { Socket } from "socket.io";
import validate from "./utils/validateToken";
import { router } from "./routes";

const socketPort = SOCKET_PORT ? parseInt(SOCKET_PORT) : 8000;

//socket io config
const io = new Server(socketPort, {
	cors: {
		origin: "*",
		credentials: true,
	},
});

io.on("connection", (socket: Socket) => {
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
});

const port = PORT || 3003;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(router);

app.listen(port, () => {
	console.log(`escuchando en el puerto ${port}`);
});

export { io };
