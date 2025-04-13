import express, { Request, Response,  } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import todoRoutes from './routes/todoRoutes';


dotenv.config();


const app = express();


app.use(cors());
app.use(express.json());


app.use('/api/todos', todoRoutes);


app.get('/', (req: Request, res: Response) => {
  res.send('API is running...');
});



connectDB()

export default app;
