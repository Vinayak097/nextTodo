'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Todo, updateTodo } from '@/lib/api';

interface TodoCardProps {
  todo: Todo;
  onDelete: (id: string) => void;
  onUpdate: () => void;
}

export default function TodoCard({ todo, onDelete, onUpdate }: TodoCardProps) {
  const [isCompleting, setIsCompleting] = useState(false);

  const handleToggleComplete = async () => {
    try {
      setIsCompleting(true);
      await updateTodo(todo._id, { completed: !todo.completed });
      onUpdate();
    } catch (error) {
      console.error('Error toggling todo completion:', error);
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-800">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className={`text-lg font-medium ${todo.completed ? 'line-through text-gray-500' : ''}`}>
            {todo.title}
          </h3>
          {todo.description && (
            <p className={`mt-1 text-sm text-gray-600 dark:text-gray-300 ${todo.completed ? 'line-through text-gray-400' : ''}`}>
              {todo.description}
            </p>
          )}
          <div className="mt-2 text-xs text-gray-500">
            {new Date(todo.createdAt).toLocaleDateString()}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleToggleComplete}
            disabled={isCompleting}
            className={`p-2 rounded-full ${
              todo.completed
                ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300'
                : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
            }`}
            aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
          >
            {todo.completed ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <Link
          href={`/todo/${todo._id}`}
          className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          View & Edit
        </Link>
        <button
          onClick={() => onDelete(todo._id)}
          className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
