import axios from "axios";
import { TOKEN } from "../config";

const api = axios.create({
	baseURL: "http://localhost:3001",
	headers: {
		authorization: `Bearer ${TOKEN}`,
	},
});

export default api;
