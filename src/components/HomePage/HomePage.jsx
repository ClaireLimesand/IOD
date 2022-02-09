import React from "react";
import HomeItem from "../HomeItem/HomeItem";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { makeStyles } from '@material-ui/core/styles';

import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

import './HomePage.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  boxShadow: 24,
};

const useStyles = makeStyles((theme) => ({
  addIcon: {
      '& svg': {
          fontSize: 40
      }
  }
}));

function HomePage() {

  const dispatch = useDispatch();
  const classes = useStyles();

  const announcements = useSelector((store) => store.announcements);
  const user = useSelector((store) => store.user);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
};

useEffect(() => {
  dispatch({ type: 'FETCH_ANNOUNCEMENTS' });
}, []);

const [messageType, setMessageType] = useState('');
const [messageText, setMessageText] = useState('');

const handleSave = () => {
  const newMessage = {
      type: messageType,
      text: messageText
  }
  console.log('new message', newMessage);
  dispatch({
    type: 'ADD_MESSAGE',
    payload: newMessage
  })
      // history.push('/');
}


  return (
    <div className="container">
        <div className="home-header">
        </div>
        <h1 className="home-header-text">Welcome Back!
        {user.access_level == 3 &&
                <IconButton
                    className={classes.addIcon}
                    onClick={handleOpen}
                    fontSize="large" 
                    variant='contained' 
                >
                    <AddIcon />
                </IconButton>
        }
        </h1>
      {announcements.map((message) => {
        return <HomeItem key={message.id} messageItem={message} />;
      })}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <center>
                <Box sx={style}>
                    <center className="modal-box">
                        <h3>Make An Announcement:</h3>
                        <FormControl sx={{ m: 1, minWidth: 200 }}>
                          <InputLabel id="dropdown">Category</InputLabel>
                          <Select
                              value={messageType}
                              label="Message Category"
                              onChange={(event) => console.log('hey!', event.target.value)}
                              // onChange={(event) => setMessageType(event.target.value)}
                          >
                              {announcements.map((item) => {
                                  return (
                                      <MenuItem>{item.title}</MenuItem>
                                  );
                              })}
                          </Select>
                      </FormControl>
                      <div>
                    <TextField
                        id="textField"
                        label="Description"
                        multiline
                        rows={4}
                        value={messageText}
                        onChange={(event) => setMessageText(event.target.value)}
                    />
                    </div>
                    </center>
                </Box>
            </center> 
            </Modal> 
    </div>
  );
}

export default HomePage;
