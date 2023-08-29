import { Logger } from "../interfaces/Logger.interface";
import { Schema, model } from "mongoose";

const LoggerSchema = new Schema<Logger>(
	{
		headers: {
			type: Schema.Types.Mixed,
			required: true,
		},
		body: {
			type: Schema.Types.Mixed,
			required: true,
		},
		route: {
			type: String,
			required: true,
		},
		method: {
			type: Schema.Types.Mixed,
			required: true,
		},
		type: {
			type: String,
			required: true,
			default: "SOCKET",
		},
	},
	{
		timestamps: true,
	},
);

const LoggerModel = model("Logger", LoggerSchema);
export default LoggerModel;
