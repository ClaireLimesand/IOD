import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';

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
                <h3 className="home-title">{messageItem.title}</h3>
                <p className="home-message">{messageItem.message}</p>
                {user.access_level == 3 &&
                    <Button  
                        onClick={() => handleDeleteButton(messageItem.message_id)} 
                        size="small" 
                        variant='contained' 
                        sx={{ backgroundColor: '#15B097' }}>
                            Delete
                    </Button>
                }
            </div>
        </div>
    )
};

export default HomeItem;