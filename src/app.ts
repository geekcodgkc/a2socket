import express, { Request, Response } from "express";
import cors from "cors";
import validateMiddleware from "./middlewares/validateMiddleware";
import nodeStorage from "node-localstorage";
import { Server } from "socket.io";
import { SOCKET_PORT, PORT, ACCESS } from "./config";
import {
	createData,
	updateData,
	deleteData,
	sendSyncDataService,
} from "./services/sendData.Services";
import { Socket } from "socket.io";
import handleData from "./utils/handleData";

const socketPort = SOCKET_PORT ? parseInt(SOCKET_PORT) : 8000;
const storage = new nodeStorage.LocalStorage("./queue");

const localStorageInitialState = {
	cloudQueue: [],
	queue: [],
};

storage.getItem("queue")
	? console.log(storage.getItem("queue"))
	: storage.setItem("queue", JSON.stringify(localStorageInitialState));

const state = {
	connection: false,
};

//socket io config
const io = new Server(socketPort, {
	cors: {
		origin: "*",
		credentials: true,
	},
});

io.on("connection", (socket: Socket) => {
	console.log(socket.handshake);
	if(!socket.handshake.auth.token) socket.disconnect()
	state.connection = true;

	socket.emit('hello', 'hello')

	// data para api local
	socket.on("sync", () => {
		sendSyncDataService();
	});
	// data para api cloud
	socket.on("syncCloud", (data) => {
		handleData(data);
	});
	socket.on("disconnect", () => {
		state.connection = false;
		console.log('dis')
	});

	socket.on('OK', (e) => console.log(e))
});

io.emit('POST', {route:'order', data: {
	id: 12,
	products: {id:99, name: 'nombre del producto'}
}})
io.emit('POST', {route:'client', data: {
	name: 'cliente',
	zone: {id: 33}
}})

const port = PORT || 3003;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/data", validateMiddleware, async (req: Request, res: Response) => {
	const data = req.body;
	console.log(req.body)
	// socket send data function
	data.method = req.method;
	createData(data, state.connection);
	res.send("sended succesfully");
});

app.put(
	"/data/:id",
	validateMiddleware,
	async (req: Request, res: Response) => {
		const data = req.body;
		const id = req.params.id;
		console.log(req.body)
		data.id = id;
		data.method = req.method;
		// socket send data function
		updateData(data, state.connection);
		res.send("sended succesfully");
	},
);

app.delete(
	"/data/:id",
	validateMiddleware,
	async (req: Request, res: Response) => {
		const id = req.params.id;
		const data = req.body;
		data.method = req.method;
		data.id = id;
		// socket send data function
		deleteData(data, state.connection);
		res.send("sended succesfully");
	},
);

app.listen(port, () => {
	console.log(`escuchando en el puerto ${port}`);
});

export { io, storage };
