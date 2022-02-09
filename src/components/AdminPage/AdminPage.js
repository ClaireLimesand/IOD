import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import Grid from '@mui/material/Grid';
import './AdminPage.css';

function AdminPage() {
    const dispatch = useDispatch();

    const applications = useSelector((store) => store.applicationsReducer);

    useEffect(() => {
        dispatch({
            type: 'FETCH_APPLICATIONS'
        });
    }, [])

    return (
      <div className="container admin-page">
          <Grid container spacing={2}>
                <Grid item sm={5} className="admin-alerts-container">
                    <center>
                        <h2>Internship Applications</h2>
                    </center>
                    {applications.map((application) => {
                        return (
                            <div key={application.id}>
                                <p>{application.student_name} has applied at {application.company}</p>
                            </div>
                        );
                    })}
                </Grid>
          </Grid>
      </div>
    );
}

export default AdminPage;
