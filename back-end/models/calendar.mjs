import mongoose from 'mongoose';

const calendarSchema = new mongoose.Schema({
    //making sure i only pull the entries for this specific user
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
    },
    

    items: [{
        title: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        priority: {
            type: Number,
            default: 0
        },
        dueDate: {
            type: Date
        },
        completed: {
            type: Boolean,
            default: false
        }
    }]
}, {
    timestamps: true
})

const Calendar = mongoose.model('Calendar', calendarSchema)

export default Calendar;