import express from 'express';
import dotenv from 'dotenv';

import { connectDB } from './utils/db';
import { bookRoutes } from './routes/bookRoutes';
import { userRoutes } from './routes/userRoutes';
import { reminderService } from './services/reminderService';
import { setupSwagger } from './swagger';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Database connection
connectDB();

// Start the reminder service
reminderService();

// Routes
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);

// Setup Swagger for API documentation and testing
setupSwagger(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});