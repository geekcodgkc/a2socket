import { io } from "../app";
import MessageModel from "../models/Message.Model";

/*
	envia mensajes para actualizar la cola atravez del socket
	y guarda el mensaje en la cola esperando que
*/
const sendMessage = async (
	roomId: string,
	message: string | object | Array<string | object>,
) => {
	io.to(roomId).emit("updateData", message);
};

/*
	solicita a los branch que recopilen los datos
	y sean enviado al mainBranch
*/

interface salesServiceInterface {
	roomId: string;
	cierre?: boolean;
}

const salesSevice = async ({
	roomId,
	cierre = false,
}: salesServiceInterface) => {
	io.to(roomId).emit("syncSales", { cierre });
};

/*
	envia los datos de ventas de los branch
	para el mainBranch
	al room que corresponde al branch especifico
*/
const sendSalesServices = async (
	roomId: string,
	message: string | object | Array<string | object>,
) => {
	io.to(roomId).emit("giveSales", message);
};

export { sendMessage, salesSevice, sendSalesServices };
