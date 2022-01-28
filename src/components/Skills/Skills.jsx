import React, { useEffect } from 'react';
import { useHistory } from "react-router";
import {useDispatch, useSelector} from 'react-redux';
import useReduxStore from '../../hooks/useReduxStore';
import { useState } from 'react';

import TextField from '@mui/material/TextField';

function Skills() {

    const history = useHistory();
    const dispatch = useDispatch();
    const store = useReduxStore();

    const skills = useSelector((store) => store.skillsReducer);

    const [skill, setSkill] = useState('');
    
    useEffect(() => {
        dispatch({ type: 'FETCH_SKILLS' });
    }, []);

    const handleSaveSkillButton = () => {
        const newSkill = {
            skill: skill
        }
        console.log('new skill!!!', newSkill)
        dispatch({
            type: 'ADD_SKILL',
            payload: newSkill
        })
    };  

    return (
        <div>
            
            <h4>Skills</h4>
            {store.skills.map((skill) => (
            <p>{skill.skill}</p>
            ))
            }
            <TextField 
                value={skill}
                onChange={(event) => setSkill(event.target.value)}
            />
            <button onClick={handleSaveSkillButton}>
                Add Skill
            </button>

        </div>
    );

}

export default Skills;