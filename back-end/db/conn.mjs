import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

//Global Config:
//get the mongodb connection uri from environment variables loaded by dotenv
const mongoURI = process.env.MONGO_URI;

//create a function to connect to mongoose
const db = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export default db;