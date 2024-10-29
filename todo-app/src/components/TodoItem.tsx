import React from 'react';
import { TodoItem as TodoItemType } from '../types';
import { FaEdit } from 'react-icons/fa';

interface Props {
    todo: TodoItemType;
    onUpdate: (id: number) => void;
    onDelete: (id: number) => void;
    onEdit: (todo: TodoItemType) => void;
}

export const TodoItem: React.FC<Props> = ({ todo, onUpdate, onDelete, onEdit }) => {
    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <span
                onClick={() => onEdit(todo)}
                style={{
                    cursor: 'pointer',
                    textDecoration: todo.isComplete ? 'line-through' : 'none',
                    color: todo.isComplete ? '#6c757d' : '#000',
                }}
                className="d-flex align-items-center"
            >
                {todo.name}
                <FaEdit className="ms-2 text-muted" />
            </span>
            <div>
                <button
                    className={`btn btn-sm me-2 ${todo.isComplete ? 'btn-warning' : 'btn-success'
                        }`}
                    onClick={() => onUpdate(todo.id)}
                >
                    {todo.isComplete ? 'Mark Incomplete' : 'Mark Complete'}
                </button>
                <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onDelete(todo.id)}
                >
                    Delete
                </button>
            </div>
        </li>
    );
};
