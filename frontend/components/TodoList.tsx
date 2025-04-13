'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getTodos, deleteTodo, Todo } from '@/lib/api';
import TodoCard from './TodoCard';

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await getTodos(page);
      setTodos(data.todos);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError('Failed to load todos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [page]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      try {
        setIsDeleting(true);
        await deleteTodo(id);
        await fetchTodos(); // Refresh the list
      } catch (err) {
        setError('Failed to delete todo');
        console.error(err);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  if (loading && todos.length === 0) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-md dark:bg-red-900 dark:text-red-200">
        {error}
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 dark:text-gray-400 mb-4">No todos found</p>
        <Link
          href="/todo"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Create your first todo
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {todos.map((todo) => (
          <TodoCard
            key={todo._id}
            todo={todo}
            onDelete={handleDelete}
            onUpdate={fetchTodos}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <nav className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1 || loading}
              className="px-3 py-1 rounded-md border border-gray-300 text-sm disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages || loading}
              className="px-3 py-1 rounded-md border border-gray-300 text-sm disabled:opacity-50"
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
