import React from "react";
import { useSelector } from "react-redux";

import './FavoriteProject.css';

function FavoriteProject() {
  // get data from reducer
  const favoriteProject = useSelector((store) => store.favoriteProject);

  return (
    favoriteProject.image != null ?
      <div className="favProjects">
        <h2 className="fav-name">{favoriteProject.project_name}</h2>
        <div className="fav-info">
          <img className="fav-img" src={favoriteProject.image} alt="Place for Image" />
          <p>{favoriteProject.description}</p>
        </div>
      </div>
    :
      <div className="favProjects">
        <h2 className="fav-name">Add a Favorite Project</h2>
        <div className="fav-info">
          <img className="fav-img" src={favoriteProject.image} />
          <p>Go to your portfolio and press the star icon to favorite a project!</p>
        </div>
      </div>
  );
}

export default FavoriteProject;
