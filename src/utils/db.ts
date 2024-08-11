import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const dbURL = process.env.DB_URL || 'mongodb://localhost:27017/library'

    await mongoose.connect(dbURL);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};
