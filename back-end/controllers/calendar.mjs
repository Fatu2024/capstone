import express from "express";
import Calendar from '../models/calendar.mjs'
import User from "../models/user.mjs";
import db from '../db/conn.mjs';


//create f(x) to get calendar entries
//when  we use mongoose to interact with the db, we get back a promise so we need to add async
export const getEntry = asynchHandler(async (req, res) => {
    console.log('in get calendars');
    //using our model to fetch all entries
    const entries = await Calendar.find({});
    console.log(entries);
    res.status(200).json(entries);
})

//create a calendar entry 
export const createEntry = asynchHandler(async (req, res) => {
    try {
        //extract data from the request body
        const { title, text } = req.body;

        //get the user id from the auth'd user
        const user = req.user.id;

        //create a new calendar entry
        const newEntry = new Calendar({ user, title, text });

        //save the calendar entry to the db
        await newEntry.save();

        //sucess response
        res.status(201).json({ message: 'calendar entry created sucessfully', entry: newEntry });

    } catch (error) {
        console.error('calendar entry creation error:', error);
        res.status(400).json({ message: 'calendar entry creation failed' });
    }
});

//update a calendar entry
export const updateEntry = asynchHandler(async (req, res) => {
    //1st get the entry by id
    const entry = await Calendar.findById(req.params.id);

    //check for the entry
    if (!entry) {
        return res.status(400).json({ message: 'calendar entry not found' });
    }

    //check if the entry belong tothe logged-in user
    if (entry.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'user not authorized'});
    }

    const updatedEntry = await Calendar.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedEntry)
});

//delete a calendar entry
export const deleteEntry = asynchHandler(async (req, res) => {
    //1st get the entry by id
    const entry = await Calendar.findById(req.params.id);

    //check for the entry
    if (!entry) {
        return res.status(400).json({ message: 'calendar entry not found' });
    }

    //check if the entry belong tothe logged-in user
    if (entry.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'user not authorized'});
    }

    await Calendar.findByIdAndDelete(req.params.id)
});