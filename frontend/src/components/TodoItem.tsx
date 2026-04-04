import React, { useState } from 'react';
import { Check, Edit2, Trash2 } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: string, completed: boolean) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string, title: string, description: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(todo.title);
    const [editDesc, setEditDesc] = useState(todo.description || '');

    const startEditing = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsEditing(true);
        setEditTitle(todo.title);
        setEditDesc(todo.description || '');
    };

    const saveEdit = (e?: React.MouseEvent | React.KeyboardEvent) => {
        if (e) e.stopPropagation();
        if (!editTitle.trim()) return;
        onEdit(todo.id, editTitle, editDesc);
        setIsEditing(false);
    };

    const cancelEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className="group flex flex-col gap-3 p-5 rounded-2xl bg-surface-container-lowest border border-primary/30 shadow-sm">
                <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && saveEdit(e)}
                    className="bg-transparent border-b border-outline-variant/30 focus:border-primary focus:outline-none text-lg font-semibold text-on-surface pb-1"
                    placeholder="Todo title"
                    autoFocus
                />
                <input
                    type="text"
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && saveEdit(e)}
                    className="bg-transparent border-b border-outline-variant/30 focus:border-primary focus:outline-none text-sm text-on-surface-variant pb-1"
                    placeholder="Description (optional)"
                />
                <div className="flex justify-end gap-2 mt-2">
                    <button onClick={cancelEdit} className="px-4 py-2 text-sm font-medium text-on-surface-variant hover:bg-surface-container-high rounded-xl transition-colors">Cancel</button>
                    <button onClick={saveEdit} className="px-4 py-2 text-sm font-bold bg-primary text-on-primary rounded-xl hover:bg-primary/90 transition-colors">Save</button>
                </div>
            </div>
        );
    }

    return (
        <div
            onClick={() => onToggle(todo.id, todo.completed)}
            className={`group flex items-start gap-4 p-5 rounded-2xl border border-transparent hover:border-outline-variant/20 transition-all duration-300 cursor-pointer ${todo.completed ? 'bg-surface-container-low opacity-60' : 'bg-surface-container-lowest'}`}
        >
            <button
                className={`mt-1 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${todo.completed ? 'bg-primary border-primary' : 'border-primary/30 group-hover:border-primary/50'}`}
            >
                <Check className={`w-4 h-4 ${todo.completed ? 'text-on-primary' : 'text-primary hidden group-hover:block opacity-50'}`} />
            </button>

            <div className="flex-1">
                <h4 className={`text-lg font-semibold ${todo.completed ? 'text-on-surface-variant line-through' : 'text-on-surface'}`}>
                    {todo.title}
                </h4>
                {todo.description && (
                    <p className="text-on-surface-variant text-sm mt-1">{todo.description}</p>
                )}
            </div>

            <div className="flex gap-1 transition-opacity opacity-0 group-hover:opacity-100">
                <button
                    onClick={startEditing}
                    className="p-2 hover:bg-on-surface/5 rounded-full transition-colors text-on-surface-variant"
                    title="Edit todo"
                >
                    <Edit2 className="w-4 h-4" />
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); onDelete(todo.id); }}
                    className="p-2 hover:bg-error/10 rounded-full transition-colors text-error-dim hover:text-error"
                    title="Delete todo"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
