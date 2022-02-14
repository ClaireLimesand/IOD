import React, { useEffect } from 'react';
import { useHistory } from "react-router";
import {useDispatch, useSelector} from 'react-redux';
import useReduxStore from '../../hooks/useReduxStore';
import { useParams } from 'react-router-dom';

import '../Skills/Skills.css';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    boxShadow: 24,
    borderRadius: 3,
};

function Skills() {

    const history = useHistory();
    const dispatch = useDispatch();
    const store = useReduxStore();
    const params = useParams();

    const skills = useSelector((store) => store.skillsReducer);
    const user = useSelector((store) => store.user);
    
    useEffect(() => {
        dispatch({ 
            type: 'FETCH_STUDENTS_SKILLS',
            payload: params.id
        });
    }, [])

    return (
        <div className="skills">
            <h3 className="skills-text">Skills</h3>

            {store.skills.map((skillItem, i) => {
                return (
                    <Typography className="skills-list" key={i}>
                        - {skillItem.skill}
                    </Typography>
                );
            })}
        </div>
    );

}

export default Skills;