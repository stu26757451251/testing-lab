import { useState } from 'react';
import { CheckSquare } from 'lucide-react';

interface TodoInputProps {
    onAddTodo: (title: string, description: string) => void;
}

export function TodoInput({ onAddTodo }: TodoInputProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleAdd = () => {
        if (!title.trim()) return;
        onAddTodo(title, description);
        setTitle('');
        setDescription('');
    };

    return (
        <section className="relative">
            <div className="bg-surface-container-lowest ghost-border rounded-3xl p-2 pl-6 flex items-center gap-4 focus-within:shadow-xl focus-within:shadow-primary/5 transition-all group">
                <div className="flex-1 flex flex-col gap-2 py-2">
                    <div className="flex items-center gap-4">
                        <CheckSquare className="w-6 h-6 text-primary/40 group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                            className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-lg placeholder:text-on-surface-variant/40 font-bold text-on-surface"
                            placeholder="What requires your focus today?"
                        />
                    </div>
                    <div className="pl-10">
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                            className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-sm placeholder:text-on-surface-variant/30 font-medium text-on-surface-variant"
                            placeholder="Add a description..."
                        />
                    </div>
                </div>
                <button
                    onClick={handleAdd}
                    className="bg-primary-container text-on-primary-container px-6 py-4 rounded-2xl font-bold hover:bg-primary hover:text-on-primary transition-all active:scale-95 duration-150 self-end mb-1 mr-1"
                >
                    Create
                </button>
            </div>
        </section>
    );
}
