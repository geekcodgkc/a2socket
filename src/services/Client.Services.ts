import api from "../api";
import { client } from "../store/redis";

interface validationData {
	roomdId: string;
	readId: string;
}

const ValidateClient = async ({ roomdId, readId }: validationData) => {
	try {
		const data = await client.get(`session:${readId}`);
		if (!data) {
			console.log("runned");
			if (roomdId && readId) {
				await api.post("/user/socket-login", {
					user: readId,
					clientID: roomdId,
				});
				await client.set(`session:${readId}`, "true", {
					EX: 600,
				});
				return true;
			}
			throw new Error("roomId and readId required");
		}
		return data === "true";
	} catch (error) {
		console.log("klk error");
		throw new Error(`${error}`);
	}
};
export { ValidateClient };
