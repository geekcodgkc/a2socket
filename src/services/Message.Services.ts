import { io } from "../app";
import MessageModel from "../models/Message.Model";

const sendMessage = async (
	roomId: string,
	message: string | object | Array<string | object>,
) => {
	io.to(roomId).emit("updateData", message);
};

const salesSevice = async (roomId:string) => {
	io.to(roomId).emit('syncSales')
}

const sendSalesServices = async (roomId:string, 
	message: string | object | Array<string | object>) => {
	io.to(roomId).emit('giveSales', message)
}

export { sendMessage, salesSevice, sendSalesServices };
