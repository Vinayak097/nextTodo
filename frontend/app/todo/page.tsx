'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import TodoForm from '@/components/TodoForm';
import { createTodo } from '@/lib/api';

export default function CreateTodoPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: { title: string; description: string }) => {
    setIsSubmitting(true);
    try {
      await createTodo(data);
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Error creating todo:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-6">
        <Link href="/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
          &larr; Back to Todos
        </Link>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Create New Todo</h1>
        <TodoForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </div>
  );
}
