# Todo App

A full-stack todo application built with Express.js, MongoDB, and Next.js 15.

## Project Structure

```
todo-app/
├── backend/                      # Express.js + MongoDB API
│   ├── controllers/
│   │   └── todoController.js     # Logic for creating, updating, getting todos
│   ├── models/
│   │   └── Todo.js               # Mongoose schema
│   ├── routes/
│   │   └── todoRoutes.js         # Express router
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── server.js                 # Entry point
│   └── .env                      # DB_URI, PORT, etc.
│
├── frontend/                     # Next.js 15 App Router
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx              # Home: paginated todo list
│   │   ├── todo/
│   │   │   ├── page.tsx          # Create Todo form (POST)
│   │   │   └── [id]/page.tsx     # View & update single todo
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── TodoList.tsx          # Renders paginated list of todos
│   │   ├── TodoCard.tsx          # Todo preview in list
│   │   └── TodoForm.tsx          # Shared form for create/edit
│   │
│   ├── lib/
│   │   └── api.ts                # Handles fetch to Express backend
│   │
│   ├── tailwind.config.ts
│   ├── postcss.config.js
│   ├── next.config.js
│   ├── tsconfig.json
│   └── package.json
```

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/todo-app
   NODE_ENV=development
   ```

4. Start the backend server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env.local` file with the following variables:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. Start the frontend development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Features

- Create, read, update, and delete todos
- Mark todos as completed
- Pagination for todo list
- Responsive design with Tailwind CSS
