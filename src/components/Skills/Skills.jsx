import React, { useEffect } from 'react';
import { useHistory } from "react-router";
import {useDispatch, useSelector} from 'react-redux';
import useReduxStore from '../../hooks/useReduxStore';

function Skills() {

    const history = useHistory();
    const dispatch = useDispatch();
    const store = useReduxStore();

    const skills = useSelector((store) => store.skills);
    
    useEffect(() => {
        dispatch({ type: 'FETCH_SKILLS' });
    }, []);

    return (
        <div>
            <p>Skills</p>
        </div>
    );

}

export default Skills;