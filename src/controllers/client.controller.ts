import { Request, Response } from "express";
import {
    GetClient,
    GetClients,
    UpdateClient,
    DeleteClient,
    CreateCLient,
    ValidateClient
} from '../services/Client.Services'

const createClient = async(req: Request, res: Response) => {
    try {
        await CreateCLient()
        res.json({message: 'message'})
    } catch (error) {
        res.send(error)
    }
}

const getClient = async(req: Request, res: Response) => {
    try {
        await GetClient()
        res.json({message: 'message'})
    } catch (error) {
        res.send(error)
    }
}

const getClients = async(req: Request, res: Response) => {
    try {
        await GetClients()
        res.json({message: 'message'})
    } catch (error) {
        res.send(error)
    }
}

const updateClient = async(req: Request, res: Response) => {
    try {
        await UpdateClient()
        res.json({message: 'message'})
    } catch (error) {
        res.send(error)
    }
}

const deleteClient = async(req: Request, res: Response) => {
    try {
        await DeleteClient()
        res.json({message: 'message'})
    } catch (error) {
        res.send(error)
    }
}

const validateClient = async(req: Request, res: Response) => {
    try {
        await ValidateClient()
        res.json({message: 'message'})
    } catch (error) {
        res.send(error)
    }
}

export {
    createClient,
    validateClient,
    updateClient,
    deleteClient,
    getClient,
    getClients
}