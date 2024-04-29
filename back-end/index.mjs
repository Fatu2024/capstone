import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

//setting up our port
const PORT = process.env.PORT || 2024;

//creating the express app
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }))