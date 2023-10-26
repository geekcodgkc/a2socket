import express from "express";
import cors from "cors";
import morgan from "morgan";
import { Server } from "socket.io";
import { SOCKET_PORT, PORT } from "./config";
import { Socket } from "socket.io";
import { router } from "./routes";
import socketHandler from "./socket";
import { client } from "./store/redis";

const socketPort = SOCKET_PORT ? parseInt(SOCKET_PORT) : 8002;

//socket io config
const io = new Server(socketPort, {
	cors: {
		origin: "*",
		credentials: true,
	},
});

//client;

io.on("connection", (socket: Socket) => {
	socketHandler(socket);
});

const port = PORT || 3003;

const app = express();
app.use(cors());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));
app.use(
	morgan((tokens, req, res) => {
		return [
			tokens.method(req, res),
			tokens.url(req, res),
			tokens.status(req, res),
			tokens.res(req, res, "content-length"),
			"-",
			tokens["response-time"](req, res),
			"ms",
		].join(" ");
	}),
);
app.use(router);

console.log("socket running on port ", SOCKET_PORT);
app.listen(port, () => {
	console.log(`escuchando en el puerto ${port}`);
});

export { io };
