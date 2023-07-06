import api from "../api";

const createService = async (route, body) => {
	try {
		const { data } = await api.post(`/${route}`, body);
		console.log(data);
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};

const updateService = async (route, body) => {
	try {
		const { data } = await api.put(`/${route}`, body);
		console.log(data);
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};

const deleteService = async (route, body) => {
	try {
		const { data } = await api.delete(`/${route}`, body);
		console.log(data);
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};

export { deleteService, updateService, createService };
