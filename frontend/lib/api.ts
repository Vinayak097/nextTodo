const API_URL = NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
import { NEXT_PUBLIC_API_URL } from '@/config';
import axios from 'axios'

export interface Todo {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TodosResponse {
  todos: Todo[];
  page: number;
  totalPages: number;
  total: number;
}


export async function getTodos(page = 1, limit = 10): Promise<TodosResponse> {
  const response = await fetch(`${API_URL}/todos?page=${page}&limit=${limit}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }
  
  return response.json();
}

// Get a single todo by ID
export async function getTodoById(id: string): Promise<Todo> {
  const response = await fetch(`${API_URL}/todos/${id}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch todo');
  }
  
  return response.json();
}

// Create a new todo
export async function createTodo(todoData: { title: string; description?: string }): Promise<Todo> {
  const response = await fetch(`${API_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todoData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create todo');
  }
  
  return response.json();
}

// Update a todo
export async function updateTodo(
  id: string,
  todoData: { title?: string; description?: string; completed?: boolean }
): Promise<Todo> {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todoData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update todo');
  }
  
  return response.json();
}

// Delete a todo
export async function deleteTodo(id: string): Promise<{ message: string }> {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete todo');
  }
  
  
  return response.json();
}
