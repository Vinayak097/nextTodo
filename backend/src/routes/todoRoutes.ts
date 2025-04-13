import express from 'express';
import {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} from '../controllers/todoController';

const router = express.Router();

router.get('/',getTodos);
router.post('/' , createTodo);
router.put('/:id',updateTodo);
router.delete('/:id',deleteTodo);
router.get('/:id',getTodoById);

export default router;
