import express from 'express';

//asyncHandler makes asynchronous operations in express routes easier to handle by simplifying error handling.
//once installed, we will wrap all of our controllers in it.
import asynchHandler from 'express-async-handler';

//bring in our model
import User from "../models/user.mjs";
import db from '../db/conn.mjs';

//allows me to create my routes
const router = express.Router();

//create f(x) to get users
//router = GET /users
//when  we use mongoose to interact with the db, we get back a promise so we need to add async
export const getUsers = asynchHandler(async (req, res) => {
    //using our model to fetch all users
    const users = await User.find({});

    res.status(200).json(users);
})

//create a user 
export const createUser = asynchHandler(async (req, res) => {
    try {
        //extract data from the request body
        const { username, email, password} = req.body;

        // check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'user already exists' });
        }

        //create a new user
        const newUser = new User({ username, email, password });

        //save the user to the db
        await newUser.save();

        //sucess response
        res.status(201).json({ message: 'user created sucessfully', user: newUser });

    } catch (error) {
        console.error('user creation error:', error);
        res.status(400).json({ message: 'user creation failed' });
    }
});

//update a user
export const updateUser = asynchHandler(async (req, res) => {
    //1st get the user by id
    const user = await User.findById(req.params.id)
    if (!user) {
        res.status(400).json({ message: 'user not found'})   
    }
    //then update the user
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedUser)
})

//delete a user
export const deleteUser = asynchHandler(async (req, res) => {

    const user = await User.findById(req.params.id)
    if (!user) {
        res.status(400)
        throw new Error('user not found')
    }
    
    const deletedUser = await User.findByIdAndDelete(req.params.id, req.body)

    res.status(200).json(deleteUser)
})
