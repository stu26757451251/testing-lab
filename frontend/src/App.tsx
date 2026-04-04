import { useState, useEffect } from 'react';
import { Todo } from './types/todo';
import { Header } from './components/Header';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { getTodos, deleteTodo, addTodo, editTodo, toggleTodoStatus } from './services/todo';


export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  const toggleTodo = (id: string, completed: boolean) => {
    toggleTodoStatus(id, !completed)
      .then(() => fetchTodos())
  };

  const fetchTodos = () => {
    getTodos()
      .then((res) => setTodos(res))
  }


  const handleEditTodo = (id: string, title: string, description: string) => {
    editTodo(id, title, description)
      .then(() => fetchTodos())
  }

  const handleAddTodo = (title: string, description: string) => {
    addTodo(title, description)
      .then(() => fetchTodos())
  }

  const handleDeleteTodo = (id: string): void => {
    deleteTodo(id)
      .then(() => fetchTodos())
  }

  return (
    <div className="min-h-screen selection:bg-primary-container selection:text-on-primary-container">
      <main className="max-w-3xl mx-auto px-6 py-20 space-y-12">
        <Header activeTodosCount={activeTodosCount} />
        <TodoInput onAddTodo={handleAddTodo} />
        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={handleDeleteTodo}
          onEdit={handleEditTodo}
        />
      </main>
    </div>
  );
}
