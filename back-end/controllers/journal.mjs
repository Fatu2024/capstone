import express from "express";
import Journal from '../models/journal.mjs';
import User from "../models/user.mjs";
import db from '../db/conn.mjs';


//create f(x) to get journal entries
//when  we use mongoose to interact with the db, we get back a promise so we need to add async
export const getEntry = asynchHandler(async (req, res) => {
    console.log('in get journals');
    //using our model to fetch all entries
    const entries = await Journal.find({});
    console.log(entries);
    res.status(200).json(entries);
})

//create a journal entry 
export const createEntry = asynchHandler(async (req, res) => {
    try {
        //extract data from the request body
        const { title, text } = req.body;

        //get the user id from the auth'd user
        const user = req.user.id;

        //create a new journal entry
        const newEntry = new Journal({ user, title, text });

        //save the journal entry to the db
        await newEntry.save();

        //sucess response
        res.status(201).json({ message: 'journal entry created sucessfully', entry: newEntry });

    } catch (error) {
        console.error('journal entry creation error:', error);
        res.status(400).json({ message: 'journal entry creation failed' });
    }
});

//update a journal entry
export const updateEntry = asynchHandler(async (req, res) => {
    //1st get the entry by id
    const entry = await Journal.findById(req.params.id);

    //check for the entry
    if (!entry) {
        res.status(400).json({ message: 'journal entry not found'})
        //then update the entry
    } else {
        //check if the entry belongs to the logged-in user
        if (entry.user.toString() !== req.user.id) {
            res.status(401).json({ message: 'user not authorized'})
        } else {
            const updatedEntry = await Journal.findByIdAndUpdate(req.params.id, req.body, {new: true});
            res.status(200).json(updatedEntry)
        }
    }
});

//delete a journal entry
export const deleteEntry = asynchHandler(async (req, res) => {
    //1st get the entry by id
    const entry = await Journal.findById(req.params.id);

    //check for the entry
    if (!entry) {
        res.status(400).json({ message: 'journal entry not found'})
        //then delete the entry
    } else {
        //check if the entry belongs to the logged-in user
        if (entry.user.toString() !== req.user.id) {
            res.status(401).json({ message: 'user not authorized'})
        } else {
            await Journal.findByIdAndDelete(req.params.id);
            res.status(200).json({ id: req.params.id })
        }
    }
});