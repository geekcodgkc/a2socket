import api from "../api";

const createService = async (route: string, body: object) => {
	try {
		const { data } = await api.post(`/${route}`, body);
		console.log(data.data);
		return true;
	} catch (error) {
		return error;
	}
};

const updateService = async (route: string, body: object) => {
	try {
		const { data } = await api.put(`/${route}`, body);
		console.log(data.data);
		return true;
	} catch (error) {
		return error;
	}
};

const deleteService = async (route: string, body: object) => {
	try {
		const { data } = await api.delete(`/${route}`, body);
		console.log(data.data);
		return true;
	} catch (error) {
		return error;
	}
};

export { deleteService, updateService, createService };
