import LoggerModel from "../models/Logger.Model";

const RouteLogger = async (
	headers: object,
	body: object,
	url: string,
	method?: string,
) => {
	try {
		await LoggerModel.create({
			headers,
			body,
			route: url,
			method: { method: `${method}` },
			type: "API",
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
		const logs = await LoggerModel.find({}, {}, {limit: 10}).sort({createdAt: -1});
		return logs;
	} catch (error) {
		throw Error(`${error}`);
	}
};

export { RouteLogger, SocketLogger, getLogger };
