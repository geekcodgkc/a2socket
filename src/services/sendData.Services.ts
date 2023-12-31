import { io, storage } from "../app";

const createData = (data: unknown, state: boolean) => {
	if (!state) {
		const queue = storage.getItem("queue");
		const currentQueue = queue ? JSON.parse(queue) : queue;
		currentQueue.queue.push(data);
		storage.setItem("queue", JSON.stringify(currentQueue));
		return;
	}
	io.emit("POST", data);
};

const updateData = (data: unknown, state: boolean) => {
	if (!state) {
		const queue = storage.getItem("queue");
		const currentQueue = queue ? JSON.parse(queue) : queue;
		currentQueue.queue.push(data);
		storage.setItem("queue", JSON.stringify(currentQueue));
		return;
	}
	io.emit("PUT", data);
};

const deleteData = (data: unknown, state: boolean) => {
	if (!state) {
		const queue = storage.getItem("queue");
		const currentQueue = queue ? JSON.parse(queue) : queue;
		currentQueue.queue.push(data);
		storage.setItem("queue", JSON.stringify(currentQueue));
		return;
	}
	io.emit("DELETE", data);
};

const sendSyncDataService = () => {
	const queue = storage.getItem("queue");
	if (queue) {
		const { queue: currentQueue, cloudQueue } = JSON.parse(queue);
		const len = currentQueue.length;
		for (let i = 0; i < len; i++) {
			const data = currentQueue.pop();
			switch (data.method) {
				case "POST":
					io.emit("POST", data);
					break;
				case "PUT":
					io.emit("PUT", data);
					break;

				case "DELETE":
					io.emit("DELETE", data);
					break;

				default:
					break;
			}
		}
		storage.setItem("queue", JSON.stringify({ queue: [], cloudQueue }));
	}
};

export { createData, updateData, deleteData, sendSyncDataService };
