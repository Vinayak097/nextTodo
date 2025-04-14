'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getTodos, deleteTodo, Todo, updateTodo } from '@/lib/api';
import TodoCard from './TodoCard';
import Navbar from './Navbar';
import { useTodoListStore } from '@/lib/store';

export default function TodoList() {
  const {todos,setTodos}=useTodoListStore();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  

  useEffect(()=>{
    (async()=>{
      try{
        setLoading(true);
        const response=await getTodos(page);
        setTodos(response.todos);
        setTotalPages(response.totalPages);
      }catch(e){
        setError('Failed to fetch todos');
      }finally{
        setLoading(false);
      }
    })()
  },[])

  

  

 

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
        <p
         
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Create your first todo
        </p>
      </div>
    );
  }

  return (
    <div className="w-[401px] flex flex-col gap-[16px]">
    <Navbar></Navbar>
    <div className="overflow-y-auto scrollbar-hide max-h-[calc(100vh-200px)]">
      <div className="flex flex-col gap-[16px]">
        {todos.map((todo) => (
          <TodoCard key={todo._id} todo={todo} />
        ))}
      </div>
    </div>
  </div>
  );
}
