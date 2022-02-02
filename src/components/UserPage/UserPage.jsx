import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UserItem from '../UserItem/UserItem';
import { useEffect } from 'react';
import Skills from '../Skills/Skills';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const profile = useSelector((store) => store.profile);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'CHECK_USER_EXISTS'
    });
  }, [])

  return (
    <div className="container">
      {profile.map((data) => {
        return <UserItem key={data.id} dataItem={data}/>
      })}
      <Skills /> 
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
