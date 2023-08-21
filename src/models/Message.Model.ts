import { Message } from "../interfaces/Message.interface";
import { Schema, model } from "mongoose";

const MessageSchema = new Schema<Message>({
	message: {
		type: Schema.Types.Mixed,
		required: true,
	},
	createDate: {
		type: Date,
		default: Date.now(),
	},
	roomId: {
		type: String,
		required: true,
	},
	reads: [
		{
			type: String,
		},
	],
});

const MessageModel = model("Messages", MessageSchema);
export default MessageModel;
