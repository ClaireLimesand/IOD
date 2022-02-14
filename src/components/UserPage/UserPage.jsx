import React from "react";
import { useSelector, useDispatch } from "react-redux";
import UserItem from "../UserItem/UserItem";
import { useEffect } from "react";
import Skills from "../Skills/Skills";
import FavoriteProject from "../FavoriteProject/FavoriteProject";
import './UserPage.css';
import AdminProfile from "../AdminProfile/AdminProfile";

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const profile = useSelector((store) => store.profile);
  const user = useSelector(store => store.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "FETCH_PROFILE",
    });
    dispatch({
      type: "CHECK_USER_EXISTS",
    });
    dispatch({
      type: 'DETECT_FAVORITE_PROJECT',
      payload: user.id
    });
  }, []);

  return (
    <div className="container">
      {profile.map((data) => {
        return (
          data.access_level < 3 ?
            <UserItem key={data.id} dataItem={data} />
          :
            <AdminProfile key={data.id} dataItem={data} />
        );
      })}

      {user.access_level < 3 &&
        <div className="user-data">
          <Skills />
          <FavoriteProject />
        </div>
      }
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
