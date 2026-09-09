import axios from 'axios';
const backendUrl = import.meta.env.VITE_URL_BACKEND;
const baseUrl = backendUrl ? `${backendUrl}/api/notes` : '/api/notes';

const getAll = () => {
	const request = axios.get(baseUrl);

	return request.then((response) => {
		return response.data;
	});
};

const create = (newObject) => {
	const request = axios.post(baseUrl, newObject);
	return request.then((response) => response.data);
};

const update = (id, newObject) => {
	const request = axios.put(`${baseUrl}/${id}`, newObject);
	return request.then((response) => response.data);
};

export default { getAll, create, update };
