//import express so i can access the express router
import express from "express";


//create a router instance by calling Router(). 
//this creates a router object that can be used to create routes and middleware (ex. router.get(), router.post(), etc.)
const router = express.Router();

//userRoutes
router.get('/', (req, res) => {
    res.status(200).json({ message: 'get users'})
});

router.post('/', (req, res) => {
    res.status(200).json({ message: 'set users'})
});

router.put('/:id', (req, res) => {
    res.status(200).json({ message: 'update users'})
});

router.delete('/:id', (req, res) => {
    res.status(200).json({ message: 'delete users'})
});




//export the router
export default router;