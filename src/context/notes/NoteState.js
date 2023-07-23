import { useState } from "react";
import NoteContext from "./NoteContext";
const host = "http://localhost:5000"
const NoteState = (props) => {
  const initialNotes = [];
  const initialUser = []
  const [notes, setnotes] = useState(initialNotes)
  const [user, setuser] = useState(initialUser)
  //API CALLS
  const getAllNotes = async () => {

    const response = await fetch(`${host}/api/getallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('auth-token')
      },

    });
    const note = await response.json();
    setnotes(note);
    console.log(note)

  }

  const addNote = async (title, description) => {
    const response = await fetch(`${host}/api/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('auth-token')
      },
      body: JSON.stringify({ title, description })
    });
    const note = await response.json()
    const newnotes = notes.concat(note);
    setnotes(newnotes);
  }

  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('auth-token')
      },
    });
    const Json = await response.json();
    const newNote = notes.filter((note) => { return note._id !== id });
    setnotes(newNote);
  }

  const editNote = async (id, title, description) => {
    //API CAll
    const response = await fetch(`${host}/api/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('auth-token')
      },
      body: JSON.stringify({ title, description })
    });
    const json = await response.json();
    let newNotes = JSON.parse(JSON.stringify(notes))
    // LOGIC TO EDIT NOTE
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        break;
      }
    }
    setnotes(newNotes)
  }

  const getUser = async () => {
    const response = await fetch(`${host}/api/getThisUser`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('auth-token')
      },

    });
    const User = await response.json();
    console.log(User)
    setuser(User)
  }
  return (
    <NoteContext.Provider value={{ notes, setnotes, addNote, deleteNote, editNote, getAllNotes, getUser, user }}>
      {props.children}
    </NoteContext.Provider>
  )
};

export default NoteState