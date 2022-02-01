import React from "react";
import HomeItem from "../HomeItem/HomeItem";
import { useSelector } from "react-redux";

import './HomePage.css';

function HomePage() {
  const announcements = useSelector((store) => store.announcements);

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
