import express from 'express';
import { connectDB } from './utils/db';

const app = express();
const port = 3000;

connectDB();

app.get('/', (req, res) => {
  res.send('Hello from Express TypeScript!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});