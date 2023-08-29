import LoggerModel from "../models/Logger.Model";

const RouteLogger = async (
	headers: object,
	body: object,
	url: string,
	method?: string,
) => {
	console.log(method);
	try {
		await LoggerModel.create({
			headers,
			body,
			route: url,
			method: { method: `${method}` },
			type: "SOCKET",
		});
	} catch (error) {
		console.log(error);
	}
};

const SocketLogger = async (
	headers: object,
	body: object,
	url: string,
	method: object,
) => {
	try {
		await LoggerModel.create({
			headers,
			body,
			route: url,
			method,
			type: "SOCKET",
		});
	} catch (error) {
		console.log(error);
	}
};

const getLogger = async () => {
	try {
		const logs = await LoggerModel.find();
		return logs;
	} catch (error) {
		throw Error(`${error}`);
	}
};

export { RouteLogger, SocketLogger, getLogger };
