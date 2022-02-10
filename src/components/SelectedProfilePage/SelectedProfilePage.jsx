import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SelectedProfileItem from '../SelectedProfilePage/SelectedProfileItem';
import { useEffect } from 'react';
import Skills from '../Skills/Skills';
import { useParams } from 'react-router';

function SelectedProfilePage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
const profile = useSelector((store) => store.profile);
const params = useParams();
const dispatch = useDispatch();

useEffect(() => {
    handleRefresh()
}, [])

const handleRefresh = () =>{
    if (profile.length === 0) {
        dispatch ({
            type: 'FETCH_PROFILE',
            payload: params.id
        }),
        dispatch ({
            type: 'CHECK_USER_EXISTS',
            payload: params.id
        })
    }
}
return (
    <div className="container">
        {profile.map((data) => {
        return <SelectedProfileItem key={data.id} dataItem={data}/>
        })}
        <Skills /> 
    
    </div>
);
}

// this allows us to use <App /> in index.js
export default SelectedProfilePage;