import React from 'react';
import { useHistory } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';

function Internship({internship}) {
    
    const history = useHistory();
    const dispatch = useDispatch();
    
    const user = useSelector((store) => store.user);

    const handleDeleteButton = (id) => {
        dispatch({
            type: 'DELETE_INTERNSHIP',
            payload: id
        })
    }; 

    return (
        <Card sx={{ maxWidth: 345, backgroundColor: '#E8E9EE' }}>
            <center>
                <img src={internship.company_logo} className='company-logo' draggable='false' />
            </center>
            <p className='company-logo-border'></p>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {internship.company_name}
                </Typography>
                <Typography sx={{ fontStyle: 'italic' }}>
                    {internship.company_subtitle}
                </Typography>
                <Typography sx={{ paddingBottom: 1, fontStyle: 'italic' }}>
                    {internship.start_date} to {internship.end_date}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {internship.company_description}
                </Typography>
            </CardContent>
            <CardActions>
                <button className='apply-btn'>Apply</button>
                {user.access_level == 3 &&
                    <IconButton  
                        onClick={() => {
                        history.push(`/editinternship/${internship.id}`);
                        }}>
                        <EditIcon />
                    </IconButton>
                }
                {user.access_level == 3 &&
                    <IconButton  
                        onClick={() => handleDeleteButton(internship.id)}>
                        <ClearIcon />
                    </IconButton>
                }
            </CardActions>
        </Card>

    );
}

export default Internship;
