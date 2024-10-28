// src/App.tsx
import React, { useState, useEffect } from 'react';
import { TodoItem } from './types';
import { TodoItem as TodoItemComponent } from './components/TodoItem';
import { fetchTodos, addTodo, updateTodo, deleteTodo } from './services/todoService';
import { useDebounce } from './hooks/useDebounce';

const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  const debouncedSearchTerm = useDebounce(search, 500);

  useEffect(() => {
    fetchTodos(debouncedSearchTerm)
      .then(response => setTodos(response.data))
      .catch(error => console.error('Failed to fetch todos', error));
  }, [debouncedSearchTerm]);

  const handleAdd = async () => {
    const response = await addTodo(input);
    setTodos([...todos, response.data]);
    setInput('');
  };

  const handleUpdate = async (id: number) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      const updatedTodo = { ...todo, isComplete: !todo.isComplete };
      await updateTodo(id, updatedTodo.isComplete);
      setTodos(todos.map(t => t.id === id ? updatedTodo : t));
    }
  };

  const handleDelete = async (id: number) => {
    await deleteTodo(id);
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <div className="App">
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Add new todo" />
      <button onClick={handleAdd}>Add Todo</button>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name"
      />
      <ul>
        {todos.map(todo => (
          <TodoItemComponent key={todo.id} todo={todo} onUpdate={handleUpdate} onDelete={handleDelete} />
        ))}
      </ul>
    </div>
  );
};

export default App;
