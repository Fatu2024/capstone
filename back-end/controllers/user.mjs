import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//once installed, we will wrap all of our controllers in it.
import asyncHandler from 'express-async-handler';

//bring in our model
import User from "../models/user.mjs";
import db from '../db/conn.mjs';

//allows me to create my routes
const router = express.Router();

//generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}


//register user f(x)
//method: POST 
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    //check if user exists
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('user already exists')
    }

    //hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //create user
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })

    //if user was created
    if (user) {
        res.status(201).json({
            _id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('invalid user data')
    }
})


//authenticate a user
//route: POST api/users/login
//access: public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    //check for user email
    const user = await User.findOne({ email })

    //check the pw
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('invalid credentials')
    }
})


//get user data f(x)
//route: GET api/users/me
//access: private
const getMe = asyncHandler(async (req, res) => {
    //to protect a route, use middleware

    const { _id, username, email } = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        username,
        email
    })
})

export { registerUser, loginUser, getMe };
