import React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

import "./UserItem.css";

function UserItem({ dataItem }) {
  return (
    <div>
      <div className="head">
        <div className="top">
          <img className="banner" src={dataItem.banner} />
        </div>

        <div className="sub">
          <Stack direction="row" spacing={2}>
            <Avatar
              className="avatar"
              alt="Caleb"
              src={dataItem.picture}
              sx={{ width: 200, height: 200 }}
            />
          </Stack>
          <div>
            <div className="name-pros">
              <h2>{dataItem.name}</h2>
              <p className="pronouns">{dataItem.pronouns}</p>
            </div>
            <p className="email">{dataItem.email}</p>
            <p className="linked">{dataItem.linkedin}</p>
          </div>
        </div>
      </div>

      <div className="about">
          <h3 className="about-text">About</h3>
          <p className="about-data">{dataItem.about}</p>
      </div>
    </div>
  );
}

export default UserItem;
