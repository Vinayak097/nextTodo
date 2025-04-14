'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Todo, updateTodo } from '@/lib/api';
import formatDate from '@/lib/dateformater';
import { useTodoStore } from '@/lib/store';
import { useRouter } from 'next/navigation';

interface TodoCardProps {
  todo: Todo;
  
}


export default function TodoCard({ todo }: TodoCardProps) {
  const [isCompleting, setIsCompleting] = useState(false);
  const router=useRouter()
  const { setSelectedTodo, selectedTodo } = useTodoStore();
  const handleToggleComplete = async () => {
    try {
      setIsCompleting(true);
      await updateTodo(todo._id, { completed: !todo.completed });
     
    } catch (error) {
      console.error('Error toggling todo completion:', error);
    } finally {
      setIsCompleting(false);
    }
  };
  const handleSelection = () => {
    setSelectedTodo(todo);
    if(window.innerWidth<768){
      router.push('/todo')
    }
  };
  return (
    <div onClick={handleSelection} className='bg-white hover:cursor-pointer rounded-md flex flex-col  h-[96px] w-full shadow-sm py-2 px-4'  >
      <p className="font-poppins font-semibold text-[18px] leading-[100%] tracking-[0.02em] line-clamp-2">
        {todo.title} 
      </p>
      <div className='flex justify-between items-center py-2 '>
        <p className='font-poppins max-w-[269px] font-normal text-[14px] leading-[19px] tracking-normal line-clamp-2'> {todo.description} </p>
        <p className='text-[#00000080] text-xs tracking-normal'>{formatDate(todo.createdAt)}</p>
      </div>
    </div>
  );
}
