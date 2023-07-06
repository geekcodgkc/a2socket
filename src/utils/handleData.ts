import {
	createService,
	deleteService,
	updateService,
} from "../services/syncDataToCloud.Services";

interface syncData {
	method: string;
	data: object;
	route: string;
}

const handleData = (data: syncData[]) => {
	data.forEach(async (entry) => {
		try {
			switch (entry.method) {
				case "POST":
					await createService(entry.route, entry.data);
					break;
				case "PUT":
					await updateService(entry.route, entry.data);
					break;
				case "DELETE":
					await deleteService(entry.route, entry.data);
					break;
				default:
					break;
			}
		} catch (error) {
			console.log(error);
		}
	});
};

export default handleData;
