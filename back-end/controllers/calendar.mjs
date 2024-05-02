import express from "express";
import asyncHandler from 'express-async-handler';
import Calendar from '../models/calendar.mjs'
import User from "../models/user.mjs";
import db from '../db/conn.mjs';


//create f(x) to get calendar entries
export const getEntry = asyncHandler(async (req, res) => {

    //if there's an id, get the entry that goes with it
    if (req.params.id) {
        const entry = await Calendar.findById(req.params.id);
        res.json(entry);

        //if there's no id, get all calendar entries for user
    } else {
        const entries = await Calendar.find({});
        res.json(entries);
    }
});

//create a calendar entry 
export const createEntry = asyncHandler(async (req, res) => {
    try {
        //extract data from the request body
        const { items } = req.body;

        //get the user id from the auth'd user
        const user = req.user.id;

        //create a new calendar entry
        const newEntry = new Calendar({ user, items });

        //save the calendar entry to the db
        await newEntry.save();

        //sucess response
        res.status(201).json({ message: 'calendar entry created sucessfully', entry: newEntry });

    } catch (error) {
        console.error('calendar entry creation error:', error);
        res.status(400).json({ message: 'calendar entry creation failed' });
    }
});

// update a calendar entry
export const updateEntry = asyncHandler(async (req, res) => {
    // first get the entry by id
    const entry = await Calendar.findById(req.params.id);

    // check for the entry
    if (!entry) {
        return res.status(400).json({ message: 'calendar entry not found' });
    }

    // check if the entry belongs to the logged-in user
    if (entry.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'user not authorized' });
    }

    // assuming req.body contains the updated item data and the item's id
    const { itemId, ...updateData } = req.body;

    // update the specific item within the items array
    const updatedEntry = await Calendar.findOneAndUpdate(
        { _id: req.params.id, 'items._id': itemId }, // match the calendar entry and the specific item
        { $set: { 'items.$': updateData } }, // update the matched item
        { new: true }
    );

    res.status(200).json(updatedEntry);
});





//delete a calendar entry
export const deleteEntry = asyncHandler(async (req, res) => {
    //1st get the entry by id
    const entry = await Calendar.findById(req.params.id);

    //check for the entry
    if (!entry) {
        return res.status(400).json({ message: 'calendar entry not found' });
    }

    //check if the entry belong tothe logged-in user
    if (entry.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'user not authorized' });
    }

    await Calendar.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'calendar entry deleted successfully' });
});