import React from 'react';
import { TodoItem as TodoItemType } from '../types';

interface Props {
  todo: TodoItemType;
  onUpdate: (id: number) => void;
  onDelete: (id: number) => void;
}

export const TodoItem: React.FC<Props> = ({ todo, onUpdate, onDelete }) => {
  return (
    <li>
      {todo.name}
      <button onClick={() => onUpdate(todo.id)}>
        {todo.isComplete ? 'Mark Incomplete' : 'Mark Complete'}
      </button>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
};
