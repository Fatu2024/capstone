//bring in all my imports
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";

//setting up our port
const PORT = process.env.PORT || 2024;

//creating the express app
const app = express();

//middleware for body data
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

//tell the app to listen on the port
app.listen(PORT, () => console.log(`server is listening on port ${PORT}`))