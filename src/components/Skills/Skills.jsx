import React, { useEffect } from 'react';
import { useHistory } from "react-router";
import {useDispatch, useSelector} from 'react-redux';
import useReduxStore from '../../hooks/useReduxStore';
import { useState } from 'react';
import './Skills.css';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function Skills() {

    const history = useHistory();
    const dispatch = useDispatch();
    const store = useReduxStore();

    const skills = useSelector((store) => store.skillsReducer);

    const [skill, setSkill] = useState('');
    const [open, setOpen] = React.useState(false);
    const [editOpen, editSetOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    useEffect(() => {
        dispatch({ type: 'FETCH_SKILLS' });
    }, []);

    const handleSaveSkillButton = () => {
        const newSkill = {
            skill: skill
        }
        dispatch({
            type: 'ADD_SKILL',
            payload: newSkill
        })
    }; 

    const handleDeleteSkillButton = (id) => {
        dispatch({
            type: 'DELETE_SKILL',
            payload: id
        })
    };  

    return (
        <div>
            
            <h4>Skills
            <IconButton
                onClick={handleOpen}
            >
                <AddIcon />
            </IconButton>
            
            </h4>
            
            {store.skills.map((skill, i) => (
            <p key={i}>{skill.skill}
            
            <IconButton
                onClick={() => {
                    history.push(`/editskill/${skill.id}`);
                    }}
            >
                <EditIcon />
            </IconButton>

            <IconButton
                onClick={() => handleDeleteSkillButton(skill.id)}
            >
                <ClearIcon />
            </IconButton>
            
            </p>
            ))
            }
            
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Add A Skill
                </Typography>
                
                <input 
                value={skill}
                onChange={(event) => setSkill(event.target.value)}
                />
                
                <button onClick={handleSaveSkillButton}>
                    Add Skill
                </button>

                </Box>
            </Modal>     
        </div>
    );

}

export default Skills;