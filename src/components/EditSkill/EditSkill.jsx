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
            <center>
                <form className="edit-skill">
                    <h3 className='skills-title'>Edit Skill</h3>
                    <img className="login-gradient" src="gradient_bar.png" draggable={false} />
                    <input
                        className="skill-input"
                        value={editSkillReducer.skill || ""}
                        onChange={handleSkillChange}
                    >
                    </input>
                    <br />
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

                </form>
            </center>
        </div>
    );
}

export default EditSkill;
