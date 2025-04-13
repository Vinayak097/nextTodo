import Link from 'next/link';
import TodoList from '@/components/TodoList';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Todo App</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your tasks efficiently</p>
      </header>

      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Your Todos</h2>
        <Link
          href="/todo"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Create New Todo
        </Link>
      </div>

      <TodoList />
    </div>
  );
}
