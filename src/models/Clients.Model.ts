import { Schema, model } from "mongoose";
import { ClientInterface, Branch } from "../interfaces/Clients.interface";

const BranchSchema = new Schema<Branch>({
	name: {
		type: String,
		required: true,
	},
	location: {
		type: String,
		required: true,
	},
});

const ClientSchema = new Schema<ClientInterface>(
	{
		branchs: [BranchSchema],
		rif: {
			type: String,
			required: true,
			unique: true,
		},
		name: {
			type: String,
			required: true,
			unique: true,
		},
		phone: {
			type: String,
			required: true,
			unique: true,
		},
		address: {
			type: String,
			required: true,
		},
		billingDate: {
			type: Date,
			required: true,
		},
		mainBranch: {
			type: String,
			required: true,
			unique: true,
		},
		mainBranchLocation: {
			type: String,
			required: true,
		},
		verified: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	},
);

const ClientModel = model("Clients", ClientSchema);
export default ClientModel;
