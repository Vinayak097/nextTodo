import Link from 'next/link';
import TodoList from '@/components/TodoList';
import Image from 'next/image';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <div className=" bg-gray-100 flex flex-col justify-center">
      
    <Header></Header>
    
    <TodoList />

    
    </div>
  );
}
