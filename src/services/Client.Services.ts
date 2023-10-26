import api from "../api";

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
export { ValidateClient };
