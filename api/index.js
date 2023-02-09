import express from 'express';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';

const app = express();

app.use(express.json());

app.use('/api/posts', authRoutes);
app.use('/api/posts', userRoutes);
app.use('/api/posts', postRoutes);

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
