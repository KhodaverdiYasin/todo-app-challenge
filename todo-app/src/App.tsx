import React, { useState, useEffect } from 'react';
import { TodoItem } from './types';
import TodoModal from './components/TodoModal';
import { useDebounce } from './hooks/useDebounce';
import { getTodoProvider } from './providers/TodoProviderFactory';
import { TodoItem as TodoItemComponent } from './components/TodoItem';

const App: React.FC = () => {
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [input, setInput] = useState('');
    const [search, setSearch] = useState('');
    const [providerType, setProviderType] = useState('api');
    const [editingTodo, setEditingTodo] = useState<TodoItem | null>(null);
    const [newTitle, setNewTitle] = useState('');
    const [error, setError] = useState<string | null>(null);
    const todoProvider = getTodoProvider(providerType);
    const debouncedSearchTerm = useDebounce(search, 500);

    useEffect(() => {
        todoProvider
            .fetchTodos(debouncedSearchTerm)
            .then(setTodos)
            .catch((error) => console.error('Failed to fetch todos', error));
    }, [debouncedSearchTerm, providerType]);

    const handleAdd = async () => {
        if (input.trim() === '') {
            setError('Todo cannot be empty');
            return;
        }
        const newTodo = await todoProvider.addTodo(input);
        setTodos([...todos, newTodo]);
        setInput('');
        setError(null);
    };

    const handleUpdate = async (id: number) => {
        const todo = todos.find((t) => t.id === id);
        if (todo) {
            await todoProvider.updateTodo(id, !todo.isComplete);
            setTodos(
                todos.map((t) => (t.id === id ? { ...t, isComplete: !t.isComplete } : t))
            );
        }
    };

    const handleDelete = async (id: number) => {
        await todoProvider.deleteTodo(id);
        setTodos(todos.filter((t) => t.id !== id));
    };

    const handleProviderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setProviderType(e.target.value);
    };

    const handleEdit = (todo: TodoItem) => {
        setEditingTodo(todo);
        setNewTitle(todo.name);
    };

    const handleSaveTitle = async () => {
        if (editingTodo) {
            await todoProvider.updateTodoTitle(editingTodo.id, newTitle);
            setTodos(
                todos.map((t) => (t.id === editingTodo.id ? { ...t, name: newTitle } : t))
            );
            setEditingTodo(null);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Todo List</h1>

            <div className="row mb-3">
                <div className="col-md-6 mx-auto">
                    <select
                        className="form-select mb-2"
                        value={providerType}
                        onChange={handleProviderChange}
                    >
                        <option value="api">API Provider</option>
                        <option value="local">Local Storage Provider</option>
                        <option value="memory">In-Memory Provider</option>
                    </select>

                    <div className="input-group mb-2">
                        <input
                            type="text"
                            className={`form-control ${error ? 'is-invalid' : ''}`}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Add new todo"
                        />
                        <button
                            className="btn btn-primary"
                            onClick={handleAdd}
                            disabled={input.trim() === ''}
                        >
                            Add Todo
                        </button>
                        {error && <div className="invalid-feedback">{error}</div>}
                    </div>

                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by name"
                        />
                    </div>
                </div>
            </div>

            <ul className="list-group">
                {todos.map((todo) => (
                    <TodoItemComponent
                        key={todo.id}
                        todo={todo}
                        onUpdate={handleUpdate}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                    />
                ))}
            </ul>

            <TodoModal
                todo={editingTodo}
                newTitle={newTitle}
                onClose={() => setEditingTodo(null)}
                onChange={(e) => setNewTitle(e.target.value)}
                onSave={handleSaveTitle}
            />
        </div>
    );
};

export default App;
