import { Request, Response } from 'express';
import Todo from '../models/Todo';







const getTodos = async (req: Request, res: Response)=> {
  try {
    const page:number = parseInt(req.query.page as string) ||1;
    const limit:number =parseInt(req.query.limit as string)||10;
    console.log(page , limit)
    const skip = (page - 1) * limit;

    const [todos,total]= await Promise.all([
      Todo.find({}).sort({createdAt:-1}).sort({created:-1}).skip(skip).limit(limit),
      Todo.countDocuments({})
    ]);

    const totalPages = Math.ceil(total / limit);

    res.json({
      todos,
      page,
      totalPages,
      total,
    });

    return;
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    return;
  }
};

const getTodoById = async (req: Request, res: Response): Promise<void> => {
  try {
    const todo = await Todo.findById(req.params.id);
    
    if (!todo) {
      res.status(404).json({ message: 'Todo not found' });
      return;
    }
    
    res.json(todo);
    return;
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    return;
  }
};


const createTodo = async (req:Request, res: Response): Promise<void> => {
  try {
    const { title, description } = req.body;
    
    if (!title || !description) {
      res.status(400).json({ message: 'Title is required and description is required' });
      return;
    }
    
    const todo = await Todo.create({
      title,
      description,
      completed: false,
    });
    
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
  }
};


const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const {title,description,completed }= req.body;
    const todo= await Todo.findById(req.params.id);
    if(!todo){
      res.status(404).json({message:'Todo not found'});
      return;
    }
    todo.title=title || todo.title,
    todo.description=description || todo.description;
    todo.completed= completed || todo.completed;
    const updatedTodo= await todo.save();
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
  }
};


const deleteTodo = async (req: Request, res: Response): Promise<Response> => {
  try {
    const todo = await Todo.findById(req.params.id);
    
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
      
    }
    
    await Todo.findByIdAndDelete( req.params.id );
    
    return res.json({ message: 'Todo removed' });
  } catch (error) {
    return res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
  }
};

export {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};
