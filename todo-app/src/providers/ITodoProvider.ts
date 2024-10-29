import { TodoItem } from '../types';

export interface ITodoProvider {
    fetchTodos(searchTerm?: string): Promise<TodoItem[]>;
    addTodo(name: string): Promise<TodoItem>;
    updateTodo(id: number, isComplete: boolean): Promise<void>;
    deleteTodo(id: number): Promise<void>;
    updateTodoTitle(id: number, name: string): Promise<void>;
}
