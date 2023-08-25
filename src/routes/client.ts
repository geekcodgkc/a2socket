import { Router } from "express";
import { 
    createClient, 
    validateClient, 
    updateClient,
    deleteClient,
    getClient,
    getClients 
} from "../controllers/client.controller";

const router = Router()

router.post('/', createClient)
router.get('/', getClients)
router.get('/:id', getClient)
router.delete('/:id', deleteClient)
router.put('/:id', updateClient)

export { router }