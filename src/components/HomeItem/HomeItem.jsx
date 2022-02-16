import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

import './HomeItem.css';

function HomeItem({messageItem}) {
    const dispatch = useDispatch();

    // get user info from reducer
    const user = useSelector((store) => store.user);

    // what happens on delete button for announcements
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
                    type: 'DELETE_ANNOUNCEMENT',
                    payload: id
                })
            }
        })
    };  

    return(
        <div>
            <div className="home-messages">
                <h3 className="home-title">{messageItem.title}
                    {user.access_level == 3 &&
                        <IconButton  
                            onClick={() => handleDeleteButton(messageItem.id)}>
                                <ClearIcon />
                        </IconButton>
                    }
                </h3>
                <p className="home-message">{messageItem.message}</p>
            </div>
        </div>
    )
};

export default HomeItem;