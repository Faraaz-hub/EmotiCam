import mongoose from 'mongoose';

declare global {
  var __db: mongoose.Connection | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/emoticam';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = global.__db;

if (!cached) {
  cached = global.__db = mongoose.connection;
}

export async function connectDB() {
  if (cached?.readyState === 1) {
    return cached;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    return mongoose.connection;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

export { mongoose };
