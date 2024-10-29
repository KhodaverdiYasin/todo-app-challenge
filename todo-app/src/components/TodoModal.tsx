import React from 'react';
import { TodoItem } from '../types';

interface Props {
    todo: TodoItem | null;
    newTitle: string;
    onClose: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSave: () => void;
}

const TodoModal: React.FC<Props> = ({ todo, newTitle, onClose, onChange, onSave }) => {
    if (!todo) return null;

    return (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Todo Title</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <input
                            type="text"
                            className={`form-control ${newTitle.trim() === '' ? 'is-invalid' : ''}`}
                            value={newTitle}
                            onChange={onChange}
                            placeholder="Edit Todo Title"
                        />
                        {newTitle.trim() === '' && (
                            <div className="invalid-feedback">Title cannot be empty.</div>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={onSave}
                            disabled={newTitle.trim() === ''}
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TodoModal;
