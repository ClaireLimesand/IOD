import React from 'react';
import { useDispatch } from 'react-redux';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';

function Internship({internship}) {
    const dispatch = useDispatch();

    return (
        <div className="container">
            <Card sx={{ maxWidth: 345 }}>
                {/* <CardMedia
                    component="img"
                    height="180"
                    image={internship.company_logo}
                    alt="company_logo"
                    draggable="false"
                /> */}
                <center>
                    <img src={internship.company_logo} className='company_logo'/>
                </center>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {internship.company_name}
                    </Typography>
                    <Typography>
                        {internship.company_subtitle}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {internship.company_description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" variant='contained'>Apply</Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default Internship;
