import {
	createService,
	deleteService,
	updateService,
} from "../services/syncDataToCloud.Services";
import { storage } from "../app";

interface syncData {
	method: string;
	data: object;
	route: string;
}

const handleCreate = async (route: string, data: object) => {
	try {
		await createService(route, data);
	} catch (error) {
		const queue = storage.getItem("queue");
		if (queue) {
			const currentQueue = JSON.parse(queue);
			currentQueue.cloudQueue.push({ route, data });
			storage.setItem("queue", JSON.stringify(currentQueue));
		}
	}
};

const handleUpdate = async (route: string, data: object) => {
	try {
		await updateService(route, data);
	} catch (error) {
		const queue = storage.getItem("queue");
		if (queue) {
			const currentQueue = JSON.parse(queue);
			currentQueue.cloudQueue.push({ route, data });
			storage.setItem("queue", JSON.stringify(currentQueue));
		}
	}
};

const handleDelete = async (route: string, data: object) => {
	try {
		await deleteService(route, data);
	} catch (error) {
		const queue = storage.getItem("queue");
		if (queue) {
			const currentQueue = JSON.parse(queue);
			currentQueue.cloudQueue.push({ route, data });
			storage.setItem("queue", JSON.stringify(currentQueue));
		}
	}
};

const runMethods = async (petitions: syncData[]) => {
	petitions.forEach(async (entry) => {
		try {
			switch (entry.method) {
				case "POST":
					await handleCreate(entry.route, entry.data);
					break;
				case "PUT":
					await handleUpdate(entry.route, entry.data);
					break;
				case "DELETE":
					await handleDelete(entry.route, entry.data);
					break;
				default:
					break;
			}
		} catch (error) {
			console.log(error);
		}
	});
};

const handleData = (data?: syncData[]) => {
	const queue = storage.getItem("queue");

	if (queue) {
		const currentQueue = JSON.parse(queue);
		const entries = currentQueue.cloudQueue;
		if (entries.lenght > 0) runMethods(entries);
	}

	if (data) {
		runMethods(data);
	}
};

export default handleData;
