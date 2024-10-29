import axios from 'axios';
import { ITodoProvider } from './ITodoProvider';
import { TodoItem } from '../types';

const API_URL = 'http://localhost:5000/api/todo';

export class ApiProvider implements ITodoProvider {
    async fetchTodos(searchTerm: string = ''): Promise<TodoItem[]> {
        const response = await axios.get(`${API_URL}?search=${searchTerm}`);
        return response.data;
    }

    async addTodo(name: string): Promise<TodoItem> {
        const response = await axios.post(API_URL, { name, isComplete: false });
        return response.data;
    }

    async updateTodo(id: number, isComplete: boolean): Promise<void> {
        await axios.put(`${API_URL}/${id}`, { isComplete });
    }

    async deleteTodo(id: number): Promise<void> {
        await axios.delete(`${API_URL}/${id}`);
    }

    async updateTodoTitle(id: number, name: string): Promise<void> {
        await axios.patch(`${API_URL}/${id}`, { name });
    }
}
