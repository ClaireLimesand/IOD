import React, { useEffect } from 'react';
import { useHistory } from "react-router";
import {useDispatch, useSelector} from 'react-redux';
import useReduxStore from '../../hooks/useReduxStore';
import { useState } from 'react';

import './Skills.css';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

const style = {
    position: 'absolute',
    top: '50%',
    left: '60%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 3,
    p: 4,
};

function Skills() {

    const history = useHistory();
    const dispatch = useDispatch();
    const store = useReduxStore();

    const skills = useSelector((store) => store.skillsReducer);
    const user = useSelector((store) => store.user);

    const [skill, setSkill] = useState('');
    const [open, setOpen] = React.useState(false);
    const [editOpen, editSetOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    useEffect(() => {
        dispatch({ type: 'FETCH_SKILLS' });
    }, []);

    const handleSaveSkillButton = (event) => {
        event.preventDefault();
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
        <div className="skills">
            
            <h3 className="skills-text">Skills
            <IconButton
                id="add-skill-icon" 
                onClick={handleOpen}
            >
                <AddIcon />
            </IconButton>
            </h3>

            {store.skills.map((skill, i) => (
            <p className="skills-list" key={i}>{skill.skill}
            
            <IconButton
                id="edit-skill-icon" 
                onClick={() => {
                    history.push(`/editskill/${skill.id}`);
                    }}
            >
                <EditIcon />
            </IconButton>

            <IconButton
                id="delete-skill-icon" 
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
                <center>
                    <Box sx={style}>
                        <form className='interior-box' onSubmit={handleSaveSkillButton}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Add a Skill
                            </Typography>
                            <img className="login-gradient" src="gradient_bar.png" draggable={false} />
                            <input 
                                className='skill-input'
                                value={skill}
                                onChange={(event) => setSkill(event.target.value)}
                                required
                            />
                            <br />
                            <button type='submit'>
                                Add Skill
                            </button>
                        </form>
                    </Box>
                </center>
            </Modal>     
        </div>
    );

}

export default Skills;