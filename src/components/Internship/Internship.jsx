import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Internship({internship}) {
    const dispatch = useDispatch();

    return (
        <div className="container">
            <Card sx={{ maxWidth: 345, backgroundColor: '#E8E9EE' }}>
                <center>
                    <img src={internship.company_logo} className='company-logo' draggable='false' />
                </center>
                <p className='company-logo-border'></p>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {internship.company_name}
                    </Typography>
                    <Typography sx={{ paddingBottom: 1, fontStyle: 'italic' }}>
                        {internship.company_subtitle}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {internship.company_description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" variant='contained' sx={{ backgroundColor: '#15B097' }}>Apply</Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default Internship;
