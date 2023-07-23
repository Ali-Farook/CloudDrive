const express = require('express');
const fetchUser = require('../middleware/fetchUser');
const note = require('../models/Note')
const router = express.Router();
const { body, validationResult } = require('express-validator');
// ROUTE 1: FETCH ALL NOTES OF USER USING GET
// WE ADD MIDDLEWARE OF NAME "fetchUser" SO WE GET USER ID IN YOUR REQUEST

router.get('/getallnotes', fetchUser, async (req, res) => {
    try {
        const Notes = await note.find({ User: req.User.id });
        return res.json(Notes);

    } catch (error) {
        return res.status(500).json({ error: "internal server error" });
    }
});

// ROUTE 1: ADD NEW NOTES TO DATABASE USING POST
// WE ADD MIDDLEWARE OF NAME "fetchUser" SO WE GET USER ID IN YOUR REQUEST

router.post('/addnote', fetchUser, [
    body('title', 'Please enter title').isLength({ min: 1 }),
    body('description', 'Please enter description').isLength({ min: 1 }),
    // body('tag', 'Please enter tag').isLength({ min: 5 })
], async (req, res) => {
    let error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }
    try {
        const { title, description } = req.body;
        const Note = new note({ description, title, User: req.User.id });
        Note.save();
        return res.json(Note);
        // const savedNote = await Note.save()
    } catch (error) {
        return res.status(500).json({ error: "internal server error" });
    }
});

// ROUTE 2: UPDATE EXISTING NOTES IN THE DATABASE USING POST
// WE ADD MIDDLEWARE OF NAME "fetchUser" SO WE GET USER ID IN YOUR REQUEST

router.put('/updatenote/:id', fetchUser, async (req, res) => {
    const { tag, description, title } = req.body;
    try {
        const newNote = {};
        if (tag) {
            newNote.tag = tag;
        }
        if (description) {
            newNote.description = description;
        }
        if (title) {
            newNote.title = title;
        }
        let Note = note.findById(req.params.id);
        if (!Note) {
            return res.status(404).send('Not found')
        }
        // if (Note.User.id !== req.params.id) {
        //     return res.status(401).send("invalid access");
        // }
        Note = await note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        return res.json(Note);
    } catch (error) {
        return res.status(500).json({ error: "internal server error" });
    };
});

router.delete('/deletenote/:id', fetchUser, async (req, res) => {

    try {
        let Note = note.findById(req.params.id);
        if (!Note) {
            return res.status(404).send("Not found")
        }
        // if (Note.id.toString() !== req.params.id) {
        //     return res.status(401).send("invalid access");
        // }
        Note = await note.findByIdAndDelete(req.params.id);
        return res.json({ "scesss": 'note has been deleted' });
    } catch (error) {
        return res.status(500).json({ error: "internal server error" });
    }
});

module.exports = router;