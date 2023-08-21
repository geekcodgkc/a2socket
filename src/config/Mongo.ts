import { connect } from "mongoose";
import { DB_URI } from "./index";

const dbConnect = async (): Promise<void> => {
	await connect(`${DB_URI}`);
};
