'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getTodos, deleteTodo, Todo, updateTodo } from '@/lib/api';
import TodoCard from './TodoCard';
import Navbar from './Navbar';

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
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Create your first todo
        </Link>
      </div>
    );
  }

  return (
    <>
    
    <div className='h-[1823px] w-[401px] flex flex-col gap-[16px] lg:mt-[67px] lg:ml-[114px] mt-4 mx-4'>
    <Navbar></Navbar>
      {todos.map((todo)=>(
        <TodoCard key={todo._id} todo={todo} onDelete={handleDelete} onUpdate={fetchTodos} />
      ))}
      
    </div>
    </>
  );
}
