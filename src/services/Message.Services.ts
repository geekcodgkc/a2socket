import { io } from "../app";
import MessageModel from "../models/Message.Model";

const sendMessage = async (
	roomId: string,
	message: string | object | Array<string | object>,
) => {
	io.to(roomId).emit("updateData", message);
};

export { sendMessage };
