import mongoose from "mongoose";

const URL = process.env.MONGODB_URI;

export const connectDB = async () => {
  try {
    if(mongoose.connections[0].readyState) {
        return;
    }
    await mongoose.connect(URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}