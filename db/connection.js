import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
};
