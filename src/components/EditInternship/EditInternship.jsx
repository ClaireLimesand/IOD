import React, { useEffect } from 'react';
import { useHistory } from "react-router";
import {useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import TextField from '@mui/material/TextField';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import "./EditInternship.css";

function EditInternship() {
    const history = useHistory();
    const dispatch = useDispatch();
    const params = useParams();

    const editInternshipReducer = useSelector(store => store.editInternship)

    useEffect(() => {
        dispatch({
            type: 'FETCH_SINGLE_INTERNSHIP',
            payload: params.id
        })
    }, [params.id]);

    const handleNameChange = (e) => {
        dispatch({
            type: 'EDIT_INTERNSHIP_NAME',
            payload: e.target.value
        })
    }
    
    const handleSubtitleChange = (e) => {
        dispatch({
            type: 'EDIT_INTERNSHIP_SUBTITLE',
            payload: e.target.value
        })
    }

    const handleDescriptionChange = (e) => {
        dispatch({
            type: 'EDIT_INTERNSHIP_DESCRIPTION',
            payload: e.target.value
        })
    }

    const handleLogoChange = (e) => {
        dispatch({
            type: 'EDIT_INTERNSHIP_LOGO',
            payload: e.target.value
        })
    }

    const handleDateChange = (newValues) => {
        let startDate = newValues[0];
        let endDate = newValues[1];
        dispatch({
            type: 'EDIT_INTERNSHIP_START_DATE',
            payload: startDate
        });
        dispatch({
            type: 'EDIT_INTERNSHIP_END_DATE',
            payload: endDate
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = editInternshipReducer.id;
        const name = editInternshipReducer.name;
        const subtitle = editInternshipReducer.subtitle;
        const description = editInternshipReducer.description;
        const startDate = editInternshipReducer.start_date;
        const endDate = editInternshipReducer.end_date;
        const logo = editInternshipReducer.logo;

        const editedInternship = {
            id,
            name,
            subtitle,
            description,
            startDate,
            endDate,
            logo
        }

        dispatch({
            type: 'EDIT_INTERNSHIP',
            payload: {
                id: params.id,
                payload: editedInternship
            }
        })
        history.push(`/internships`)
    }

    const handleBack = (e) => {
        e.preventDefault();
        history.push(`/internships`)
    }

    return (
        <div className="container">
            <center>
                <form className="edit-internship" onSubmit={handleSubmit}>
                <h3 className="internship-title">Edit Internship</h3>
                <img className="login-gradient" src="gradient_bar.png" draggable={false} />

            <div className="edit-inputs">
            <input 
                className="internship-edit-input"
                value={editInternshipReducer.name|| ""}
                onChange={handleNameChange}
            />
            
            <input 
                className="internship-edit-input"
                value={editInternshipReducer.subtitle|| ""}
                onChange={handleSubtitleChange}
            />         
        
            <input 
                className="internship-edit-input"
                value={editInternshipReducer.logo|| ""}
                onChange={handleLogoChange}
            />    

            <textarea 
                rows="8"
                className="internship-edit-description"
                value={editInternshipReducer.description|| ""}
                onChange={handleDescriptionChange}
            />  
            </div>
            
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateRangePicker
                        startText="Start Date"
                        endText="End Date"
                        value={[editInternshipReducer.start_date, editInternshipReducer.end_date] || [null, null]}
                        onChange={(newValues) => {
                            handleDateChange(newValues);
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

            <IconButton type='submit'>
                    <CheckIcon />
            </IconButton>

            <IconButton
                onClick={handleBack}
            >
                    <ArrowBackIcon />
            </IconButton>
            
            </form>
            </center>
        
        </div>
    );
}

export default EditInternship;
