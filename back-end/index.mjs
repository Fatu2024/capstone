//bring in all my imports
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import db from './db/conn.mjs'
import errorHandler from "./middleware/errorMiddleware.mjs"
import userRoutes from "./routes/userRoutes.mjs"
import journalRoutes from './routes/journalRoutes.mjs'
//setting up our port
const PORT = process.env.PORT || 2024;

//creating the express app
const app = express();

//middleware for body data
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

//routes
app.use('/users', userRoutes)
app.use('/journal', journalRoutes)


app.use(errorHandler)




//tell the app to listen on the port
app.listen(PORT, () => console.log(`server is listening on port ${PORT}`))
