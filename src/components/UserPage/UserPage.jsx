import React from 'react';
import {useSelector} from 'react-redux';

import UserItem from '../UserItem/UserItem';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const profile = useSelector((store) => store.profile);


  return (
    <div className="container">
      {profile.map((data) => {
        return <UserItem key={data.id} dataItem={data}/>
      })}
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
