import ClientModel from "../models/Clients.Model";
import { Request } from "express";

const CreateCLient = async (req: Request) => {
	const data = req.body;
	try {
		const client = await ClientModel.create(data);
		return client;
	} catch (error) {
		throw new Error(`${error}`);
	}
};

const DeleteClient = async (req: Request) => {
	const id = req.params.id;
	try {
		await ClientModel.findByIdAndDelete(id);
		return `client with id: ${id} was removed`;
	} catch (error) {
		throw new Error(`${error}`);
	}
};

const UpdateClient = async (req: Request) => {
	const data = req.body;
	const id = req.params.id;

	try {
		if (id) {
			const current = await ClientModel.findOne({ id });
			if (!current) throw new Error(`client with id: ${id} not found`);
			const parsed = current.toJSON();
			const updated = {
				...parsed,
				...data,
			};
			const client = await ClientModel.findOneAndUpdate({ id }, updated, {
				new: true,
			});
			return client;
		}
	} catch (error) {
		throw new Error(`${error}`);
	}
};

const GetClient = async (id: string) => {
	try {
		const client = await ClientModel.findById(id);
		return client;
	} catch (error) {
		throw new Error(`${error}`);
	}
};

const GetClients = async () => {
	try {
		const clients = await ClientModel.find();
		return clients;
	} catch (error) {
		throw new Error(`${error}`);
	}
};

interface validationData {
	roomdId: string;
	readId: string;
}

const ValidateClient = async ({ roomdId, readId }: validationData) => {
	try {
		if (roomdId && readId) {
			const room = await ClientModel.findOne({ _id: roomdId });
			if (!room) return false;
			const reads = [];
			reads.push(room.mainBranch);
			room.branchs.forEach((branch) => {
				reads.push(branch._id.toString());
			});
			const isValid = reads.filter((branch) => branch === readId);
			return isValid.length > 0;
		}
		throw new Error("roomId and readId required");
	} catch (error) {
		throw new Error(`${error}`);
	}
};

export {
	GetClient,
	GetClients,
	UpdateClient,
	DeleteClient,
	CreateCLient,
	ValidateClient,
};
