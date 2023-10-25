import axios from "axios";

const GetClient = async (id: string) => {
	try {
		const client = await axios.get("https://localhost:3001/clients");
		return client;
	} catch (error) {
		throw new Error(`${error}`);
	}
};

interface validationData {
	roomdId: string;
	readId: string;
}

const ValidateClient = async ({ roomdId, readId }: validationData) => {
	try {
		if (roomdId && readId) {
		}
		throw new Error("roomId and readId required");
	} catch (error) {
		throw new Error(`${error}`);
	}
};
export { GetClient, ValidateClient };
