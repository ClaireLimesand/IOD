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

        const id = editInternshipReducer.id;
        const name = editInternshipReducer.name;
        const subtitle = editInternshipReducer.subtitle;
        const logo = editInternshipReducer.logo;
        const description = editInternshipReducer.description;
        const startDate = editInternshipReducer.start_date;
        const endDate = editInternshipReducer.end_date;

        const editedInternship = {
            id,
            name,
            subtitle,
            logo,
            description,
            startDate,
            endDate
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
            <div>

            <input 
                value={editInternshipReducer.name|| ""}
                onChange={handleNameChange}
            />
            
            <input 
                value={editInternshipReducer.subtitle|| ""}
                onChange={handleSubtitleChange}
            />

            <input 
                value={editInternshipReducer.logo|| ""}
                onChange={handleDescriptionChange}
            />              

            <input 
                value={editInternshipReducer.description|| ""}
                onChange={handleLogoChange}
            />  

            <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateRangePicker
                        startText="internship start date"
                        endText="internship end date"
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

            <IconButton
                onClick={handleSubmit}
            >
                    <CheckIcon />
            </IconButton>

            <IconButton
                onClick={handleBack}
            >
                    <ArrowBackIcon />
            </IconButton>
            
            </div>
        </div>
    );
}

export default EditInternship;
