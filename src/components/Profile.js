import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useContext } from 'react'
import noteContext from "../context/notes/NoteContext"
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Changepassword from './Changepassword'
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);
  const context = useContext(noteContext);
  const { getUser, user } = context;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <p style={{fontSize: '20px', fontWeight: 'normal', marginLeft: '10px'}} >General information</p>
      <Box
        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 500 }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          <Tab label="Profile Info" {...a11yProps(0)} />
          <Tab label="Change Password" {...a11yProps(1)} />
          <Tab label="feedback" {...a11yProps(2)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Box sx={{ '& > :not(style)': { m: 3 , mr:15} }}>
            <FormControl variant="standard">
              <InputLabel htmlFor="input-with-icon-adornment">
               <h5>First Name</h5>
              </InputLabel>
              <Input
                id="input-with-icon-adornment"
                value={user.firstName}
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                }
              />
            </FormControl>
            <TextField
              id="input-with-icon-textfield"
              label="Last Name"
              value={user.lastName}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              {/* <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} /> */}
              <TextField
              sx={{mr:18}}
              id="input-with-icon-textfield"
              label="Phone Number"
              value={user.phoneNumber}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
             <FormControl variant="standard">
              <InputLabel htmlFor="input-with-icon-adornment">
               <h5>Email Address</h5>
              </InputLabel>
              <Input
                id="input-with-icon-adornment"
                value={user.email}
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                }
              />
            </FormControl>
            </Box>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
        <Changepassword/>
        </TabPanel>
        <TabPanel value={value} index={2}>
         
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item Four
        </TabPanel>
        <TabPanel value={value} index={4}>
          Item Five
        </TabPanel>
        <TabPanel value={value} index={5}>
          Item Six
        </TabPanel>
        <TabPanel value={value} index={6}>
          Item Seven
        </TabPanel>
      </Box>
    </>
  );
}
