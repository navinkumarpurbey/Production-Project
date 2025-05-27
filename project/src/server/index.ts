import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

mongoose
  .connect('mongodb://localhost:27017/yourdb')
  .then(() => {
    console.log('MongoDB connected');
    app.listen(5000, () => console.log('Server running on port 5000'));
  })
  .catch((err) => console.error('DB connection error', err));
