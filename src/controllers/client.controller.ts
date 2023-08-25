import { Request, Response } from "express";
import {
	GetClient,
	GetClients,
	UpdateClient,
	DeleteClient,
	CreateCLient,
	ValidateClient,
} from "../services/Client.Services";

const createClient = async (req: Request, res: Response) => {
	try {
		const client = await CreateCLient(req);
		res.json(client);
	} catch (error) {
		res.send(error);
	}
};

const getClient = async (req: Request, res: Response) => {
	try {
		const client = await GetClient(req.params.id);
		res.json(client);
	} catch (error) {
		res.send(error);
	}
};

const getClients = async (req: Request, res: Response) => {
	try {
		const clients = await GetClients();
		res.json(clients);
	} catch (error) {
		res.send(error);
	}
};

const updateClient = async (req: Request, res: Response) => {
	try {
		const client = await UpdateClient(req);
		res.json(client);
	} catch (error) {
		res.send(error);
	}
};

const deleteClient = async (req: Request, res: Response) => {
	try {
		const client = await DeleteClient(req);
		res.json({ message: client });
	} catch (error) {
		res.send(error);
	}
};

export { createClient, updateClient, deleteClient, getClient, getClients };
