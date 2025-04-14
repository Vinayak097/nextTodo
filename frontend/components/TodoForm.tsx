"use client"

import { useState } from 'react';
import { Trash2, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List, ListOrdered } from 'lucide-react';

import { createTodo, deleteTodo, Todo, updateTodo } from '@/lib/api';
import { useTodoStore } from '@/lib/store';

export default function TodoForm() {

  const { 
    selectedTodo, 
    setSelectedTodo, 
    draftTodo, 
    setDraftTodo 
  } = useTodoStore();

  

  
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
    if(selectedTodo){
      await updateTodo(selectedTodo._id,{title:selectedTodo.title,description:selectedTodo.description})
      handleClear();
    }
    else{
      try{
        await createTodo(draftTodo);
        
      }catch(e){
        console.log(e)
      }
      
      handleClear();
    }
  }
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (selectedTodo) {
      setSelectedTodo({ ...selectedTodo, description: e.target.value });
    } else {
      setDraftTodo({ description: e.target.value });
    }
  };
  
  return (
    <div className="flex bg-white flex-col hidden sm:block  gap-[72px] overflow-y-auto w-[652px] rounded-md h-[400px]">
      <div className="max-w-3xl flex-1 bg-white rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
        <input 
            type="text"
            className="p-2 text-2xl font-bold w-full outline-none"
            value={selectedTodo?.title ?? draftTodo.title}
            onChange={handleTitleChange}
            placeholder="Enter title"
          />
          <button onClick={() => setSelectedTodo(null)}>
            <Trash2 className="h-5 w-5" />
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

        <div className="mt-4">
        <textarea
            className="p-2 w-full font-normal text-[18px] font-poppins min-h-[200px] rounded outline-none"
            value={selectedTodo?.description ?? draftTodo.description}
            onChange={handleDescriptionChange}
            placeholder="Enter description"
          />
          <button onClick={handleSave} className='px-2 my-2 py-1 bg-green-500  opacity-80 rounded-md flex float-right'>
            {selectedTodo? 'update' : 'create'}
            </button>
        </div>
      </div>
    </div>
  );
}

