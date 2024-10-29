// src/providers/LocalStorageProvider.ts
import { ITodoProvider } from './ITodoProvider';
import { TodoItem } from '../types';

const STORAGE_KEY = 'todos';

export class LocalStorageProvider implements ITodoProvider {
    async fetchTodos(searchTerm: string = ''): Promise<TodoItem[]> {
        const data = localStorage.getItem(STORAGE_KEY);
        const todos: TodoItem[] = data ? JSON.parse(data) : [];

        // Filter todos based on the search term (case-insensitive)
        if (searchTerm.trim()) {
            return todos.filter(todo =>
                todo.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        return todos;
    }

    async addTodo(name: string): Promise<TodoItem> {
        const todos = await this.fetchTodos();
        const newTodo: TodoItem = { id: Date.now(), name, isComplete: false };
        todos.push(newTodo);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
        return newTodo;
    }

    async updateTodo(id: number, isComplete: boolean): Promise<void> {
        const todos = await this.fetchTodos();
        const updatedTodos = todos.map(todo =>
            todo.id === id ? { ...todo, isComplete } : todo
        );
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTodos));
    }

    async deleteTodo(id: number): Promise<void> {
        const todos = await this.fetchTodos();
        const updatedTodos = todos.filter(todo => todo.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTodos));
    }

    async updateTodoTitle(id: number, name: string): Promise<void> {
        const todos = await this.fetchTodos();
        const updatedTodos = todos.map(todo =>
            todo.id === id ? { ...todo, name } : todo
        );
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTodos));
    }
}
