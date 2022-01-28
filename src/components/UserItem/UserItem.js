import React from "react";

import "./UserItem.css";

function UserItem({ dataItem }) {
  return (
    <div>
      <div>
        <div className="top">
          <img className="banner" src={dataItem.banner} />
        </div>

        <div className="sub">
          <img className="picture" src={dataItem.picture} />
          <div>
            <div className="name-pros">
              <h2>{dataItem.name}</h2>
              <p>{dataItem.pronouns}</p>
            </div>
            <p>{dataItem.email}</p>
            <p>{dataItem.linkedin}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserItem;
