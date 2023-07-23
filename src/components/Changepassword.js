import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import '../App.css'
import { useState } from 'react';

export default function BasicTextFields() {

    const [oldPassword, setoldPassword] = useState('');
    const [newPassword, setnewPassword] = useState('');
    const [conformPassword, setconformPassword] = useState('');
    const onChange1 = (e) => setoldPassword(e.target.value);
    const onChange2 = (e) => setnewPassword(e.target.value);
    const onChange = (e) => setconformPassword(e.target.value);

    const handleChangePassword = async () => {
        const response = await fetch("http://localhost:5000/api/changepassword", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            },
            body: JSON.stringify({ oldPassword: oldPassword, newPassword: newPassword, conformPassword: conformPassword })
        });
        const json = await response.json();
        console.log(json)
    };

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '22ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField type='password' id="oldPassword" value={oldPassword} name='oldPassword' onChange={onChange1} label="Old password" variant="outlined" />

            <br />
            <br />
            <TextField type='password' id="newPassword" value={newPassword} name='newPassword' onChange={onChange2} label="New Password" variant="outlined" />
            < TextField type='password' id="conformPassword" value={conformPassword} name='conformPassword' onChange={onChange} label="Confirm Password" variant="outlined" />
            <br />
            <br />
            <button className='passwordButton' onClick={handleChangePassword}>Change</button>
        </Box>
    );
}
