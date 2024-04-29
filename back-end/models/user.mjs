import mongoose from "mongoose";

//import only the timestamp object from the bson module
const { Timestamp } = require('bson');

//create our schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    }
});

//define a model for your mongodb
const User = mongoose.model('User', userSchema);

//export
export default User;