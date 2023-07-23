import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import noteContext from "../context/notes/NoteContext"
import { useContext, useState } from 'react';

import Button from '@mui/material/Button';
const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "" });
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description);
        setNote({ title: "", description: "" })
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    return (
        <div className="container my-3">
            <h2 style={{fontFamily: "Cursive"}}>Add Your Note </h2>
            <Box
                component="form"
                // sx={{width: '30%' }}
                noValidate
                autoComplete="off"
            >
                <TextField id="title" sx={{ width: '50%' }} label="Title" variant="standard" value={note.title} name='title' onChange={onChange} />
                <br />
                <br />
                <TextField label="Description" sx={{ width: '50%' }} variant="outlined" id="description" value={note.description} name='description' onChange={onChange} />
            </Box>
            <br />
            <Button type='submit' onClick={handleClick} variant="contained">Submit</Button>
        </div>
    )
}

export default AddNote