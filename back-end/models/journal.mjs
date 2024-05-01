import mongoose from "mongoose";

const journalSchema = new mongoose.Schema(
    {
        //making sure i only pull the entries for this specific user
        user: {
            type: mongoose.Schema.Types.ObjectId, 
            required: true,
            ref: 'User'
        },

        text: {
            type: String,
        }
    },
    {
        timestamps: true
    })

const Journal = mongoose.model('Journal', journalSchema);

export default Journal;