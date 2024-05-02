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
} from '../controllers/journal.mjs'

//journalRoutes
/*router.get('/', (req, res) => {
    res.status(200).json({ message: 'get entries'})
}); */

//get  all journal entries
router.route('/').get(protect, getEntry);

//get a specific journal entry
router.route('/:id').get(protect, getEntry);

//create a new journal entry
router.route('/').post(protect, createEntry);

//delete a journal entry
router.route('/:id').delete(protect, deleteEntry);

//update a journal entry
router.route('/:id').put(protect, updateEntry);


//export the router
export default router;