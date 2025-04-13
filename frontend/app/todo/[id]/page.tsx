'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import TodoForm from '@/components/TodoForm';
import { getTodoById, updateTodo, deleteTodo, Todo } from '@/lib/api';

export default function TodoDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        setLoading(true);
        const data = await getTodoById(params.id);
        setTodo(data);
      } catch (err) {
        setError('Failed to load todo');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [params.id]);

  const handleSubmit = async (data: { title: string; description: string; completed?: boolean }) => {
    setIsSubmitting(true);
    try {
      await updateTodo(params.id, data);
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      try {
        setIsDeleting(true);
        await deleteTodo(params.id);
        router.push('/');
        router.refresh();
      } catch (error) {
        console.error('Error deleting todo:', error);
        setError('Failed to delete todo');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error || !todo) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="p-4 bg-red-100 text-red-700 rounded-md dark:bg-red-900 dark:text-red-200">
          {error || 'Todo not found'}
        </div>
        <div className="mt-4">
          <Link href="/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
            &larr; Back to Todos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-6">
        <Link href="/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
          &larr; Back to Todos
        </Link>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Edit Todo</h1>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-4 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
          >
            {isDeleting ? 'Deleting...' : 'Delete Todo'}
          </button>
        </div>
        
        <TodoForm
          initialData={todo}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
}
