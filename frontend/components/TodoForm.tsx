'use client';

import { useState, FormEvent } from 'react';
import { Todo } from '@/lib/api';
import { Trash2, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List, ListOrdered } from 'lucide-react';

interface TodoFormProps {
  initialData?: Todo;
  onSubmit: (data: { title: string; description: string; completed?: boolean }) => Promise<void>;
  isSubmitting: boolean;
}

export default function TodoForm({ initialData, onSubmit, isSubmitting }: TodoFormProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [completed, setCompleted] = useState(initialData?.completed || false);
  const [error, setError] = useState('');
  const [selectedTodo ,setSelectedTodo]=useState<Todo|null>()
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    try {
      await onSubmit({
        title,
        description,
        ...(initialData && { completed }),
      });
    } catch (err) {
      setError('Failed to save todo');
      console.error(err);
    }
  };

  function handleDeleteTodo(_id: string): void {
    throw new Error('Function not implemented.');
  }

  return (
    <form onSubmit={handleSubmit} className="w-[652px] h-[736px] gap-[16px] pt-[35px] pr-[42px] pb-[35px] pl-[42px]">
      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-md dark:bg-red-900 dark:text-red-200">
          {error}
        </div>
      )}
      
      <div className="flex-1 p-6 overflow-y-auto">
          {selectedTodo ? (
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg border">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">{selectedTodo.title}</h2>
                <button  onClick={() => handleDeleteTodo(selectedTodo?._id)}>
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>

              <div className="flex items-center space-x-2 mb-4 border-b pb-2">
                <button >
                  <Bold className="h-4 w-4" />
                </button>
                <button >
                  <Italic className="h-4 w-4" />
                </button>
                <button >
                  <Underline className="h-4 w-4" />
                </button>
                <div className="h-4 border-r mx-2"></div>
                <button >
                  <AlignLeft className="h-4 w-4" />
                </button>
                <button >
                  <AlignCenter className="h-4 w-4" />
                </button>
                <button >
                  <AlignRight className="h-4 w-4" />
                </button>
                <div className="h-4 border-r mx-2"></div>
                <button >
                  <List className="h-4 w-4" />
                </button>
                <button >
                  <ListOrdered className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-4">
                <p>{selectedTodo.description}</p>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-10">
              <p>Select a todo or create a new one</p>
            </div>
          )}
        </div>
    </form>
  );
}
