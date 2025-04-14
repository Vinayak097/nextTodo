"use client"

import { memo, useState } from 'react';
import { Trash2, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List, ListOrdered } from 'lucide-react';

import { createTodo, deleteTodo, getTodos,  updateTodo } from '@/lib/api';
import { useTodoListStore, useTodoStore } from '@/lib/store';
import { usePathname } from 'next/navigation';

const TodoForm = () =>{
  const pathname = usePathname();
  const isStandalonePage = pathname === '/todo';
  const [isDeleting, setIsDeleting] = useState(false);
  const {setTodos}=useTodoListStore()
  const { 
    selectedTodo, 
    setSelectedTodo, 
    draftTodo, 
    setDraftTodo 
  } = useTodoStore();

  const fetchTodos = async () => {
    try {
      const response = await getTodos();
      setTodos(response.todos);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };
  const [loading,setloading]=useState(false)

  const handleDelete=async()=>{
    setIsDeleting(true);
    if(!selectedTodo){
      setIsDeleting(false)
      return;
    }
    await deleteTodo(selectedTodo._id)
    fetchTodos()
    handleClear()
    setIsDeleting(false)
  }
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (selectedTodo) {
      setSelectedTodo({ ...selectedTodo, title: e.target.value });
    } else {
      setDraftTodo({ title: e.target.value });
    }
  };
  const handleClear = () => {
    setSelectedTodo(null);
    setDraftTodo({ title: '', description: '' });
  };
  const handleSave = async () => {
    setloading(true)
    if(selectedTodo){
      await updateTodo(selectedTodo._id,{title:selectedTodo.title,description:selectedTodo.description})
      handleClear();
      fetchTodos();
    }
    else{
      try{
        await createTodo(draftTodo);
        fetchTodos();
      }catch(e){
        console.log(e)
      }
      
      handleClear();
    }
    setloading(false)
  }
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (selectedTodo) {
      setSelectedTodo({ ...selectedTodo, description: e.target.value });
    } else {
      setDraftTodo({ description: e.target.value });
    }
  };
  
  return (
    <div className={`flex bg-white flex-col ${isStandalonePage ? '' : 'hidden sm:block'} gap-[72px] overflow-y-auto w-full lg:w-[652px] h-[calc(100vh-120px)] rounded-md`}>
      <div className="h-full flex flex-col bg-white rounded-lg lg:p-6 p-4">
        <div className="flex justify-between items-start gap-2 mb-4">
          <input 
            type="text"
            className="p-2 text-2xl font-bold w-full outline-none min-h-[40px] break-words"
            value={selectedTodo?.title ?? draftTodo.title}
            onChange={handleTitleChange}
            placeholder="Enter title"
          />
          <button className='hover:cursor-pointer shrink-0' onClick={() => handleDelete()}>
            {!isDeleting && <Trash2 size={20} className="" />}
            {isDeleting && <span className="ml-2 h-4 w-4 border-2 border-black border-t-transparent rounded-full animate-spin inline-block"></span>}
          </button>
        </div>
        
        <div className="flex items-center space-x-2 mb-4 border-b pb-2">
          <button>
            <Bold className="h-4 w-4" />
          </button>
          <button>
            <Italic className="h-4 w-4" />
          </button>
          <button>
            <Underline className="h-4 w-4" />
          </button>
          <div className="h-4 border-r mx-2"></div>
          <button>
            <AlignLeft className="h-4 w-4" />
          </button>
          <button>
            <AlignCenter className="h-4 w-4" />
          </button>
          <button>
            <AlignRight className="h-4 w-4" />
          </button>
          <div className="h-4 border-r mx-2"></div>
          <button>
            <List className="h-4 w-4" />
          </button>
          <button>
            <ListOrdered className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 flex flex-col h-full">
          <textarea
            className="flex-1 p-2 w-full font-normal text-[18px] font-poppins resize-none outline-none mb-4"
            value={selectedTodo?.description ?? draftTodo.description}
            onChange={handleDescriptionChange}
            placeholder="Enter description"
            style={{ height: '100%' }}
          />

          <div className="flex justify-end mt-auto pt-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-lg rounded-md flex items-center justify-center min-w-[72px] transition-opacity duration-200 opacity-90"
            >
              {loading ? (
                <span className="animate-spin my-1 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
              ) : (
                <span>{selectedTodo ? 'Update' : 'Create'}</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoForm


