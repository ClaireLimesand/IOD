import React, { useEffect } from 'react';
import { useHistory } from "react-router";
import {useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';

import "./EditSkill.css";

import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function EditSkill() {
    const history = useHistory();
    const dispatch = useDispatch();
    const params = useParams();

    const editSkillReducer = useSelector(store => store.editSkill)

    useEffect(() => {
        dispatch({
            type: 'FETCH_SINGLE_SKILL',
            payload: params.id
        })
    }, [params.id]);

    const handleSkillChange = (e) => {
        dispatch({
            type: 'EDIT_SKILL_NAME',
            payload: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({
            type: 'EDIT_SKILL',
            payload: {
                id: params.id,
                skill: editSkillReducer.skill
            }
        })
        history.push(`/user`)
    }

    const handleBack = (e) => {
        e.preventDefault();
        history.push(`/user`)
    }

    return (
        <div className="container">
            <div className="edit-skill">

            <input
                className="edit-skill-input"
                value={editSkillReducer.skill || ""}
                onChange={handleSkillChange}
            >
            </input>

            <IconButton
                onClick={handleSubmit}
            >
                    <CheckIcon />
            </IconButton>

            <IconButton
                onClick={handleBack}
            >
                    <ArrowBackIcon />
            </IconButton>
            
            </div>
        </div>
    );
}

export default EditSkill;
