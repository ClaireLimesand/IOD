import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';

import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

import './HomeItem.css';

function HomeItem({messageItem}) {
    const dispatch = useDispatch();

    const user = useSelector((store) => store.user);

    const handleDeleteButton = (id) => {
        dispatch({
            type: 'DELETE_ANNOUNCEMENT',
            payload: id
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