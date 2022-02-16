import React from 'react';
import { useHistory } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import Swal from 'sweetalert2';


import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

import { DropzoneDialog } from 'material-ui-dropzone';

function Internship({internship}) {
    
    const history = useHistory();
    const dispatch = useDispatch();
    
    // sets local state to change logo
    const [logo, setLogo] = useState('');
    const [logoOpen, setLogoOpen] = useState(false);

    const user = useSelector((store) => store.user);
    const profile = useSelector((store) => store.profile);
    

    // fetches student profile
    useEffect(() => {
        dispatch({
            type: 'FETCH_PROFILE'
        });
    }, [])

    // what happens on delete button click
    const handleDeleteButton = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#15B097',
            cancelButtonColor: '#cf3123',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
                  
                Toast.fire({
                    icon: 'success',
                    title: 'Deleted successfully'
                })
                dispatch({
                    type: 'DELETE_INTERNSHIP',
                    payload: id
                });
            }
        })
    }; 

    // what happens when student clicks apply on intership
    const handleApply = () => {
        dispatch({
            type: 'SEND_APPLICATION',
            payload: {company: internship.company_name, name: profile[0].name}
        });
    }

    // allows logo to be edited
    const handleEditLogo = (file) => {
        console.log('file', file);
        const internshipWithLogo = {
            logo: file,
            internshipId: internship.id
        }
        console.log(internshipWithLogo)
        dispatch({
            type: 'UPLOAD_LOGO',
            payload: internshipWithLogo
        });
    }

    return (
        <Card sx={{ maxWidth: 345, minWidth: 340, backgroundColor: '#E8E9EE' }}>
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
                <button className='apply-btn' onClick={handleApply}>Apply</button>
                {user.access_level == 3 &&
                    <IconButton  
                        onClick={() => {
                            history.push(`/editinternship/${internship.id}`);
                        }}
                    >
                        <EditIcon />
                    </IconButton>
                }
                {user.access_level == 3 &&
                    <IconButton  
                        onClick={() => handleDeleteButton(internship.id)}>
                        <ClearIcon />
                    </IconButton>
                }

                {user.access_level == 3 &&
                <IconButton>
                    <AddPhotoAlternateIcon
                    onClick={() => setLogoOpen(true)}/>
                </IconButton>
                }

                <DropzoneDialog
                    acceptedFiles={['image/*']}
                    cancelButtonText={"cancel"}
                    submitButtonText={"submit"}
                    maxFileSize={5000000}
                    open={logoOpen}
                    onClose={() => setLogoOpen(false)}
                    onSave={(files) => {
                    console.log('Files:', files[0]);
                    setLogoOpen(false);
                    handleEditLogo(files[0]);
                    }}
                    showPreviews={true}
                    showFileNamesInPreview={true}
                />
            
            </CardActions>
        </Card>

    );
}

export default Internship;
