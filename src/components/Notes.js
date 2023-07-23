import React from 'react'
import { Notecard } from './notecard'
import { useContext, useEffect, useRef, useState } from "react"
import noteContext from "../context/notes/NoteContext"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 500,
    minHeight: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    borderRadius: '4px',
    boxShadow: 24,
    p: 4,
};

const Notes = (props) => {
    const Navigate = useNavigate();
    const { showAlert } = props;
    const context = useContext(noteContext);
    const { notes, getAllNotes, editNote } = context;
    const [note, setNote] = useState({ id: '', etitle: "", edescription: "" });
    const ref = useRef(null);
    const refClose = useRef(null)

    const update = (note) => {
        ref.current.click();
        setNote({ id: note._id, etitle: note.title, edescription: note.description })
    };

    // For Modal Component
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = (e) => {
        e.preventDefault();
        setOpen(false);
    };

    const handleClickForUpdateNote = (e) => {
        e.preventDefault();
        editNote(note.id, note.etitle, note.edescription);
        showAlert('success', 'Note Update Successflly')
        refClose.current.click();
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (localStorage.getItem('auth-token')) {
            getAllNotes();
        }
        else {
            Navigate('/login');
        }
        // eslint-disable-next-line 
    }, []);

    return (
        <div className="container">
            <Button ref={ref} sx={{ display: 'none' }} onClick={handleOpen}>Open modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ minHeight: '400px' }}
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <div className="mb-3">
                            <label htmlFor="etitle" className="form-label">Title</label>
                            <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" value={note.etitle} onChange={onChange} />
                            <div id="emailHelp" className="form-text">Your title.</div>
                        </div>
                    </Typography>
                    <Typography id="modal-modal-description" component={'div'} sx={{ mt: 1.5 }}>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="edescription" className="form-label">Description</label>
                                <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} />
                            </div>
                            <Button type='submit' onClick={handleClickForUpdateNote} variant="contained">Update</Button>
                            <Button type='submit' ref={refClose} sx={{ display: 'none' }} onClick={handleClose} variant="contained">Close</Button>
                        </form>
                    </Typography>
                </Box>
            </Modal>
            <div className='row my-3'>
                <h2 style={{ fontWeight: 'normal' }}>  Your Notes</h2>
                {notes.map((note, index) => {
                    return <Notecard key={index} update={update} note={note} />
                })}
            </div>
        </div>
    )
}

export default Notes