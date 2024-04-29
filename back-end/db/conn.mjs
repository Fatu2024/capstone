import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

//Global Config:
//get the mongodb connection uri from environment variables loaded by dotenv
const mongoURI = process.env.MONGO_URI;

//create a variable db that holds a reference to the mongodb connection
const db = mongoose.connection

//Connect to Mongo:
//initiate mongodb connection from .env to connect to db
mongoose.connect(mongoURI);

//set up an event listener for 'open' and log 'connected' when the connection is successful
mongoose.connection.once('open', () => {
    console.log('connected')
});