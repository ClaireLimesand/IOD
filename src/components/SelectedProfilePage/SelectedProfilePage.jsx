import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SelectedProfileItem from '../SelectedProfilePage/SelectedProfileItem';
import { useEffect } from 'react';
import SelectedSkills from './SelectedSkills';
import { useParams } from 'react-router';
import SelectedFavoriteProject from '../SelectedFavoriteProject/SelectedFavoriteProject';

function SelectedProfilePage() {
    // this component doesn't do much to start, just renders some user reducer info to the DOM
    const profile = useSelector((store) => store.profile);
    const params = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: 'FETCH_SELECTED_PROFILE',
            payload: params.id
        });
    }, [])

    return (
        <div className="container">
            {profile.map((data) => {
                return <SelectedProfileItem key={data.id} dataItem={data}/>
            })}
            <div className="user-data">
                <SelectedSkills /> 
                <SelectedFavoriteProject />
            </div>
        </div>
    );
}

// this allows us to use <App /> in index.js
export default SelectedProfilePage;