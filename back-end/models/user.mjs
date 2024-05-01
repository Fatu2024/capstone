import mongoose from "mongoose";

//import only the timestamp object from the bson module
import { Timestamp } from 'bson';

//create our schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please add a username'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    }
});

//define a model for your mongodb
const User = mongoose.model('User', userSchema);

//export
export default User;