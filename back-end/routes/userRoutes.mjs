//import express so i can access the express router
import express from "express";


//create a router instance by calling Router(). 
//this creates a router object that can be used to create routes and middleware (ex. router.get(), router.post(), etc.)
const router = express.Router();

import { registerUser,
    loginUser,
    getMe,
} from '../controllers/user.mjs'

//bring in middleware- use protect as a 2nd argument in the routes to protect a route
import { protect } from '../middleware/authMiddleware.mjs';

//register a new user
router.post('/', registerUser)

//log in of existing user
router.post('/login', loginUser)

//data of logged in user (protected route)
router.get('/me', protect, getMe)

export default router;