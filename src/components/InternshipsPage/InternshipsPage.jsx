import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';

import Internship from '../Internship/Internship';
import './InternshipPage.css';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { makeStyles } from '@material-ui/core/styles';

import TextField from '@mui/material/TextField';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

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

function InternshipsPage() {
    
    const dispatch = useDispatch();
    const classes = useStyles();

    const internships = useSelector((store) => store.internshipReducer);
    const user = useSelector((store) => store.user);

    const [companyName, setCompanyName] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [description, setDescription] = useState('');
    const [logo, setLogo] = useState('');
    const [dateRange, setDateRange] = React.useState([null, null]);

    const startDate= dateRange[0];
    const endDate = dateRange[1];

    const [open, setOpen] = React.useState(false);
    const [editOpen, editSetOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setOpen(false);
        setCompanyName('');
        setSubtitle('');
        setDescription('');
        setLogo('');
        setDateRange([null, null]);
    };

    useEffect(() => {
        dispatch({
            type: 'FETCH_INTERNSHIPS'
        });
    }, [])

    const handleEditLogo = (file) => {
        console.log(file);
        setTimeout(() => {
            dispatch({
                type: 'UPLOAD_LOGO',
                payload: {file: file}
            });
        }, 1000)
    }
    

    const handleSaveButton = () => {
        console.log(startDate);
        console.log(endDate);
        const newInternship = {
            companyName: companyName,
            subtitle: subtitle,
            logo: logo,
            startDate: startDate,
            endDate: endDate,
            description: description,
        }
        console.log(newInternship);
        dispatch({
            type: 'ADD_INTERNSHIP',
            payload: newInternship
        });
        setOpen(false);
        setCompanyName('');
        setSubtitle('');
        setDescription('');
        setLogo('');
        setDateRange([null, null]);
    }; 

    return (
        <div className="container">
    
            <h1 id='internships-page-title'>Internships
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
            
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <center>
                <Box sx={style}>
                    <center className="modal-box">
                        <form>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                New Internship
                            </Typography>
                            <img className="register-gradient" src="gradient_bar.png" draggable={false} />

                            <label>Company Name</label>
                            <input 
                                className="internship-input"
                                value={companyName}
                                onChange={(event) => setCompanyName(event.target.value)}
                            />

                            <label>Internship Subtitle</label>
                            <input 
                                className="internship-input"
                                value={subtitle}
                                onChange={(event) => setSubtitle(event.target.value)}
                            />

                            <label>Internship Description</label>
                            <textarea 
                                rows="5"
                                className="internship-input internship-description"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                            />  

                            <LocalizationProvider dateAdapter={AdapterDateFns}> 
                                <DateRangePicker
                                    startText="Start Date"
                                    endText="End Date"
                                    value={dateRange}
                                    onChange={(newValue) => {
                                    setDateRange(newValue);
                                    }}
                                    renderInput={(startProps, endProps) => (
                                    <React.Fragment>
                                        <TextField {...startProps} />
                                            <Box sx={{ mx: 2 }}> to </Box>
                                        <TextField {...endProps} />
                                    </React.Fragment>
                                    )}
                                />
                            </LocalizationProvider>
                            
                            <div className='add-internship-btn-container'>
                                <button className='save-btn' onClick={handleSaveButton}>Save</button>               
                                <button className='cancel-btn' onClick={handleClose}>Cancel</button>
                            </div>
                        </form>
                    </center>
                </Box>
            </center> 
            </Modal>   
            

            <section id='internships-container'>
                {internships.map((internship) => {
                    return <Internship key={internship.id} internship={internship} />;
                })}
            </section>
        </div>
    );
}

export default InternshipsPage;
