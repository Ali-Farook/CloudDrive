import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
const Alerts = (props) => {

  return (
    <div className='container' style={{height:'15px'}}>
      {props.alert && <Stack sx={{ width: '40%',marginLeft: 'auto',marginRight: 'auto' }} spacing={2}>
        <Alert severity={props.alert.type}>{props.alert.msg}</Alert>
      </Stack>}
    </div>
  );
}

export default Alerts;