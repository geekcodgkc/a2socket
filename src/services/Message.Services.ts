import { io } from "../app";
import { client } from "../store/redis";

/*
	envia mensajes para actualizar la cola atravez del socket
	y guarda el mensaje en la cola esperando que
*/
const sendMessage = async (
	roomId: string,
	message: string | object | Array<string | object>,
) => {
	console.log("message sended");
	io.to(`${roomId}`).emit("newOrder", message);
};

const sendDraft = async (roomId: string) => {
	const draft = await client.get(`draft:${roomId}`);

	io.to(`${roomId}`).emit("draft", draft ? draft : {});
};

interface draftInput {
	id: string;
	qty: number;
}

const updateDraft = async (roomId: string, data: draftInput) => {
	const draft = await client.get(`draft:${roomId}`);
	if (draft) {
		const newDraft = { ...JSON.parse(draft) };

		if (!newDraft[data.id]) {
			newDraft[data.id] = data.qty;
		} else {
			newDraft[data.id] += data.qty;
		}

		if (newDraft[data.id] < 0) {
			newDraft[data.id] = 0;
		}

		const toStore = JSON.stringify(newDraft);

		await client.set(`draft:${roomId}`, toStore, { EX: 3600 });

		io.to(`${roomId}`).emit("draft", newDraft);
	} else {
		const newDraft = { [data.id]: data.qty };
		const toStore = JSON.stringify(newDraft);

		await client.set(`draft:${roomId}`, toStore, { EX: 3600 });

		io.to(`${roomId}`).emit("draft", newDraft);
	}
};

export { sendMessage, sendDraft, updateDraft };
