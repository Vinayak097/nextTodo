import { create } from 'zustand'
import type { Todo } from './api'
interface TodoStore {
  selectedTodo: Todo | null
  draftTodo: {
    title: string
    description: string
  }
  setSelectedTodo: (todo: Todo | null) => void
  setDraftTodo: (draft: { title?: string; description?: string }) => void
  resetDraftTodo: () => void
}

  export const useTodoStore = create<TodoStore>((set) => ({
    selectedTodo: null,
    draftTodo: {
      title: '',
      description: ''
    },
    setSelectedTodo: (todo) => set({ selectedTodo: todo }),
    setDraftTodo: (draft) => set((state) => ({
      draftTodo: { ...state.draftTodo, ...draft }
    })),
    resetDraftTodo: () => set({ draftTodo: { title: '', description: '' } })
  }))

export const usemytodo=create((set)=>({
  todos:[],
  setTodos:(todos:Todo[])=>set({todos})
}))






