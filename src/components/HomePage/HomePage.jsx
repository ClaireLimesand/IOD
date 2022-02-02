import React from "react";
import HomeItem from "../HomeItem/HomeItem";
import { useSelector, useDispatch } from "react-redux";
import {useEffect} from 'react';

import './HomePage.css';

function HomePage() {
  const dispatch = useDispatch();
  const announcements = useSelector((store) => store.announcements);

  useEffect(()=>{
      dispatch({type: 'FETCH_PROFILE'})
  }, [announcements])

    return (
    <div className="container">
        <div className="home-header">
        </div>
        <h1 className="home-header-text">Welcome Back!</h1>
      {announcements.map((message) => {
        return <HomeItem key={message.id} messageItem={message} />;
      })}
    </div>
  );
}

export default HomePage;
