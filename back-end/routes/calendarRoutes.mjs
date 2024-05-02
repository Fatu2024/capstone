//import express so i can access the express router
import express from "express";

//import my middleware
import { protect } from '../middleware/authMiddleware.mjs';


//create a router instance by calling Router(). 
const router = express.Router();

import { createEntry,
    getEntry,
    updateEntry,
    deleteEntry
} from '../controllers/calendar.mjs'

//get all calendar entries
router.route('/').get(protect, getEntry);

//get a specific calendar entry
router.route('/:id').get(protect, getEntry);

//create a new calendar entry
router.route('/').post(protect, createEntry);

//delete a calendar entry
router.route('/:id').delete(protect, deleteEntry);

//update a calendar entry
router.route('/:id').put(protect, updateEntry);


//export the router
export default router;