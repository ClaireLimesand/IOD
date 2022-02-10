import React from 'react';
import './AdminPage.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

import Grid from '@mui/material/Grid';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import RemoveModeratorIcon from '@mui/icons-material/RemoveModerator';

function AdminPage() {
    const dispatch = useDispatch();

    const applications = useSelector((store) => store.applicationsReducer);
    const students = useSelector((store) => store.students);

    useEffect(() => {
        dispatch({
            type: 'FETCH_APPLICATIONS'
        });
        dispatch({
            type: 'SEEN_NOTIFICATION'
        });
        dispatch({
            type: 'FETCH_STUDENTS_ADMIN'
        });
    }, [])

    const handleDeleteNotification = (application) => {
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
                Swal.fire (
                'Deleted!',
                'Your file has been deleted.',
                'success'
                )
                dispatch({ 
                    type: 'REMOVE_NOTIFICATION', 
                    payload: application.id 
                });
            }
        })
    }

    return (
      <div className="container admin-page">
          <Grid container spacing={2}>
                <Grid item sm={5} className="admin-alerts-container" sx={{ marginBottom: 3 }}>
                    <center>
                        <h2>Internship Applications</h2>
                    </center>
                    {applications.map((application) => {
                        return (
                            <div key={application.id}>
                                {application.new_notification ?
                                    <Typography className='new-notification notification-text'>
                                        - <span className='application-name'>{application.student_name}</span> has applied at <span className='application-company'>{application.company}</span>
                                        <IconButton onClick={() => handleDeleteNotification(application)}>
                                            <ClearIcon />
                                        </IconButton>
                                    </Typography>
                                :
                                    <Typography className='notification-text'>
                                        - <span className='application-name'>{application.student_name}</span> has applied at <span className='application-company'>{application.company}</span>
                                        <IconButton onClick={() => handleDeleteNotification(application)}>
                                            <ClearIcon />
                                        </IconButton>
                                    </Typography>
                                }
                            </div>
                        );
                    })}
                </Grid>
                <Grid item sm={6} xs={12} className="admin-alerts-container" sx={{ marginLeft: 3 }}>
                    <center>
                        <h2>Manage Users</h2>
                    </center>
                    {students.map((student, i) => {
                        return (
                            student.access_level < 3 ?
                                <Card key={i} sx={{ marginBottom: '10px', padding: '6px' }}>
                                    <Typography>{student.name} 
                                        <IconButton onClick={() => dispatch({ type: 'ADD_ADMIN', payload: student.id })}>
                                            <AddModeratorIcon sx={{ color:'#0f8874' }} />
                                        </IconButton>
                                    </Typography>
                                </Card>
                            :
                                <Card key={i} sx={{ marginBottom: '10px', padding: '6px' }}>
                                    <Typography>{student.name} <em>(admin)</em>
                                        <IconButton onClick={() => dispatch({ type: 'REMOVE_ADMIN', payload: student.id })}>
                                            <RemoveModeratorIcon sx={{ color:'#cf3123' }} />
                                            </IconButton>   
                                    </Typography>
                                </Card>
                        );
                    })}
                </Grid>
          </Grid>
      </div>
    );
}

export default AdminPage;
