import { TodoItem } from '../types';
import { ITodoProvider } from './ITodoProvider';

export class InMemoryProvider implements ITodoProvider {
    private todos: TodoItem[] = [];
    private static nextId: number = 1;

    async fetchTodos(searchTerm: string = ''): Promise<TodoItem[]> {
        if (!searchTerm.trim()) return [...this.todos];
        return this.todos.filter(todo =>
            todo.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    async addTodo(name: string): Promise<TodoItem> {
        const newTodo: TodoItem = { id: InMemoryProvider.nextId++, name, isComplete: false };
        this.todos = [...this.todos, newTodo];
        return newTodo;
    }

    async updateTodo(id: number, isComplete: boolean): Promise<void> {
        this.todos = this.todos.map(todo =>
            todo.id === id ? { ...todo, isComplete } : todo
        );
    }

    async updateTodoTitle(id: number, name: string): Promise<void> {
        this.todos = this.todos.map(todo =>
            todo.id === id ? { ...todo, name } : todo
        );
    }

    async deleteTodo(id: number): Promise<void> {
        this.todos = this.todos.filter(todo => todo.id !== id);
    }
}
