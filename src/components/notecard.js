import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useContext, useState } from 'react';
import { green, red } from '@mui/material/colors';
import noteContext from "../context/notes/NoteContext"
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';

export const Notecard = (props) => {

  const { note, update, } = props;
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const [cardState, setcardState] = useState({
    raised: false,
    shadow: 1,
  });

  const modal2 = (e) => {
    e.preventDefault();
    handleOpen2();
  };

  const style2 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-40%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 16,
    p: 4,
  };

  const copyText = () => {
    var text = document.getElementById("noteText");
    text.select();
    navigator.clipboard.writeText(text);
  }

  return (
    <div className="col-md-3 my-1" >
      <Card  onMouseOver={() => setcardState({ raised: true, shadow: 1 })}
        onMouseOut={() => setcardState({ raised: false, shadow: 1 })}
        raised={cardState.raised} zdepth={cardState.shadow}
      >
        <span style={{ float: 'right' }}> <Button onClick={copyText} variant="outlined">copy</Button></span>
        <CardContent onClick={modal2}>
          <Typography gutterBottom variant="h5" component="div">
            {note.title}
          </Typography>
          <Typography variant="body3" color="text.secondary" >
            <span id='noteText' >
              {note.description}
            </span>
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton aria-label="delete" size="large" onClick={() => deleteNote(note._id)}>
            <DeleteIcon fontSize="inherit" sx={{ color: red[300] }} />
          </IconButton>
          <IconButton sx={{ color: green[500] }} aria-label="edit" size="small" onClick={() => { update(note) }} >
            <EditIcon />
          </IconButton>
        </CardActions>
      </Card>

      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {note.title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {note.description}
          </Typography>
          <br />
          <br />
          <Button onClick={handleClose2} variant="outlined">close</Button>
        </Box>
      </Modal>
    </div>
  )
};
