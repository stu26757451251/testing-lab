import { Todo } from '../types/todo';
import { TodoItem } from './TodoItem';

interface TodoListProps {
    todos: Todo[];
    onToggle: (id: string, completed: boolean) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string, title: string, description: string) => void;
}

export function TodoList({ todos, onToggle, onDelete, onEdit }: TodoListProps) {
    return (
        <section className="space-y-3">
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            ))}
        </section>
    );
}
