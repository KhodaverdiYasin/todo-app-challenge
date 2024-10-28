import axios from 'axios';

const API_URL = 'http://localhost:5000/api/todo';

export const fetchTodos = async (searchTerm: string = '') => {
    return axios.get(`${API_URL}?search=${searchTerm}`);
};

export const addTodo = async (name: string) => {
    return axios.post(API_URL, { name, isComplete: false });
};

export const updateTodo = async (id: number, isComplete: boolean) => {
  return axios.put(`${API_URL}/${id}`, { isComplete });
};

export const deleteTodo = async (id: number) => {
    return axios.delete(`${API_URL}/${id}`);
};
