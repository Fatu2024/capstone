import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/user.mjs'

const protect = asyncHandler(async (req, res, next) => {
    let token
    
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //get token from header
            token = req.headers.authorization.split(' ')[1]

            //verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //get user from the token (token contains the user id bc we set it that way)
            //assign it to req.user so we can access req.user in any route that's protected
            req.user = await User.findById(decoded.id).select('-password')

            next()

        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('not authorized')
        }
    }
    if(!token) {
        res.status(401)
        throw new Error('not authorized, no token')
    }
})

export { protect };