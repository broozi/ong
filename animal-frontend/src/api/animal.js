import axios from 'axios';

const API_URL = 'http://localhost:3001/animais';

export const getAnimals = () => axios.get(API_URL);
export const getAnimal = (id) => axios.get(`${API_URL}/${id}`);
export const createAnimal = (data) => axios.post(API_URL, data);
export const updateAnimal = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteAnimal = (id) => axios.delete(`${API_URL}/${id}`);