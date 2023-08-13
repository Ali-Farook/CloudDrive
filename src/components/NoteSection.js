import React from 'react'
import AddNote from './addnote'
import Notes from './Notes'

const NoteSection = (props) => {
    const {showAlert} = props;
  return (
    <div>
        <AddNote showAlert={showAlert}/>
        <Notes showAlert={showAlert}/>
    </div>
  )
};

export default NoteSection;