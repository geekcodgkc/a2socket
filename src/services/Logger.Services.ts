import LoggerModel from "../models/Logger.Model";

const RouteLogger = async (
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
			type: "HTTPS",
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

export { RouteLogger, SocketLogger };
