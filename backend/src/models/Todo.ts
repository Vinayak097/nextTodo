import mongoose, { Document, Schema } from 'mongoose';


export interface ITodo extends Document {
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}


const todoSchema = new Schema<ITodo>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    completed: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the model
const Todo = mongoose.model<ITodo>('Todo', todoSchema);

export default Todo;
