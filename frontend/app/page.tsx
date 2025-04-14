

import TodoList from '@/components/TodoList';

import Header from '@/components/Header';

import TodoForm from '@/components/TodoForm';


export default function Home() {
  return (
    <div className=" bg-gray-100 flex flex-col justify-center">
    <div className="flex gap-[72px] lg:mt-[67px] lg:mx-[114px] mt-4 mx-4">
      <TodoList />
      <TodoForm></TodoForm>
    </div>
    

    
    </div>
  );
}
