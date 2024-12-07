import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load environment variables from .env file
dotenv.config();

const mongoURI = process.env.MONGODB_URI;
console.log('MongoDB URI:', mongoURI); // Add this line for debugging

const connectToDatabase = async () => {
  try {
    if (mongoose.connection.readyState >= 1) return; // If already connected
    
    // Check if mongoURI is undefined
    if (!mongoURI) {
      console.error('MongoDB URI is undefined');
      return;
    }

    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
};

export default connectToDatabase;
