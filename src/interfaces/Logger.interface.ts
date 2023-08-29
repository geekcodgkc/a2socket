import mongoose from "mongoose";

export interface Logger extends mongoose.Document {
	headers: object;
	body: object;
	route: string;
	method: object;
	type: string;
}
