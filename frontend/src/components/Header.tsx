interface HeaderProps {
    activeTodosCount: number;
}

export function Header({ activeTodosCount }: HeaderProps) {
    return (
        <section>
            <h1 className="text-6xl font-extrabold text-on-surface tracking-tight leading-[0.95] mb-8">
                Today you have <span className="text-primary italic">{activeTodosCount} todos</span> remaining.
            </h1>
        </section>
    );
}
