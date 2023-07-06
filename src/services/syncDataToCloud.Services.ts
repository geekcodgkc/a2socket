import api from "../api";

const createService = async (route: string, body: object) => {
	try {
		await api.post(`/${route}`, body);
		return true;
	} catch (error) {
		return error;
	}
};

const updateService = async (route: string, body: object) => {
	try {
		await api.put(`/${route}`, body);
		return true;
	} catch (error) {
		return error;
	}
};

const deleteService = async (route: string, body: object) => {
	try {
		await api.delete(`/${route}`, body);
		return true;
	} catch (error) {
		return error;
	}
};

export { deleteService, updateService, createService };
