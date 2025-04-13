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

const PORT =process.env.PORT;

connectDB()
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
export default app;
