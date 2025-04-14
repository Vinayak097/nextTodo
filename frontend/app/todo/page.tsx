'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { createTodo } from '@/lib/api';
import TodoForm from '@/components/TodoForm';
import { MoveLeft } from 'lucide-react';

export default function CreateTodoPage() {
 

  return (
    <div className="h-[90vh] flex flex-col gap-[16px] bg-gray-100 container mx-auto px-4 py-3 max-w-2xl">
      <div className="">
        <Link href="/" className="flex items-center gap-[16px] hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
        <MoveLeft className='font-bold' size={24} /> <p className='font-poppins font-bold text-[24px] leading-100% tracking-[0.02em]'>Back</p>
        </Link>
      </div>
      
      <TodoForm></TodoForm>
    </div>
  );
}
