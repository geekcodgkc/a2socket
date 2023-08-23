import { connect } from "mongoose";
import { DB_URI } from "./index";

const dbConnect = async (): Promise<void> => {
	try {
		await connect(`${DB_URI}`);
		console.log('db connected succesfully')
	} catch (error) {
		console.error(error)
	}
};

export default dbConnect;
