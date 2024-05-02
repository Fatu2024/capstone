//import express so i can access the express router
import express from "express";


//create a router instance by calling Router(). 
//this creates a router object that can be used to create routes and middleware (ex. router.get(), router.post(), etc.)
const router = express.Router();

import { getUsers,
    createUser,
    updateUser,
    deleteUser
} from '../controllers/user.mjs'

//userRoutes
/*router.get('/', (req, res) => {
    res.status(200).json({ message: 'get users'})
}); */

router.route('/').get(getUsers).post(createUser);

router.route('/:id').delete(deleteUser).put(updateUser);


//export the router
export default router;