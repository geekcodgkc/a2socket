import "dotenv/config";

const PORT = process.env.PORT;
const TOKEN = process.env.TOKEN;
const SOCKET_PORT = process.env.SOCKET_PORT;
const DB_URI = process.env.DB_URI;

export { PORT, TOKEN, SOCKET_PORT, DB_URI };
