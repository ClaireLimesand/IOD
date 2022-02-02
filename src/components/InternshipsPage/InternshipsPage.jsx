import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';

import Internship from '../Internship/Internship';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

const style = {
    position: 'absolute',
    top: '50%',
    left: '60%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function InternshipsPage() {
    
    const dispatch = useDispatch();

    const internships = useSelector((store) => store.internshipReducer);
    const user = useSelector((store) => store.user);

    const [companyName, setCompanyName] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [description, setDescription] = useState('');
    const [logo, setLogo] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [open, setOpen] = React.useState(false);
    const [editOpen, editSetOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        dispatch({
            type: 'FETCH_INTERNSHIPS'
        });
    }, [])

    const handleSaveButton = () => {
        const newInternship = {
            companyName: companyName,
            subtitle: subtitle,
            logo: logo,
            startDate: startDate,
            endDate: endDate,
            description: description,
        }
        console.log(newInternship)
        dispatch({
            type: 'ADD_INTERNSHIP',
            payload: newInternship
        })
    }; 

    return (
        <div className="container">
            <h1 id='internships-page-title'>Internships
                {user.access_level == 3 &&
                <IconButton
                    onClick={handleOpen}
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
                <Box sx={style}>
                
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Add An Intership
                </Typography>
                
                <input 
                placeholder="company name"
                value={companyName}
                onChange={(event) => setCompanyName(event.target.value)}
                />

                <input 
                placeholder="internship subtitle"
                value={subtitle}
                onChange={(event) => setSubtitle(event.target.value)}
                />

                <input 
                placeholder="logo picture"
                value={logo}
                onChange={(event) => setLogo(event.target.value)}
                />

                <input 
                placeholder="internship start date"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
                />

                <input 
                placeholder="internship end date"
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
                />

                <input 
                placeholder="internship description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                />
                
                <button onClick={handleSaveButton}>
                    Add Internship
                </button>

                </Box>
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
