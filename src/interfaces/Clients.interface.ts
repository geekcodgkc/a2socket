import mongoose from "mongoose";

export interface Branch extends mongoose.Document {
	name: string;
	location: string;
}

export interface ClientInterface extends mongoose.Document {
	branchs: Branch[];
	rif: string;
	name: string;
	email: string;
	phone: string;
	address: string;
	billingDate: Date;
	mainBranch: string;
	mainBranchLocation: string;
	verified: boolean;
}
