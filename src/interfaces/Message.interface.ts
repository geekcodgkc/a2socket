import mongoose from "mongoose";

export interface Message extends mongoose.Document {
	message: Object | String | Array<string | object>;
	createDate: Date;
	roomId: string;
	reads: string[];
}
