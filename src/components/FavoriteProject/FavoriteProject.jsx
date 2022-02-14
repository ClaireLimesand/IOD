import React from "react";
import { useSelector } from "react-redux";

import './FavoriteProject.css';

function FavoriteProject() {
  const favoriteProject = useSelector((store) => store.favoriteProject);

  return (
    <div className="favProjects">
      <h2 className="fav-name">{favoriteProject.project_name}</h2>
      <div className="fav-info">
        <img className="fav-img" src={favoriteProject.image} alt="Place for Image" />
        <p>{favoriteProject.description}</p>
      </div>
    </div>
  );
}

export default FavoriteProject;
