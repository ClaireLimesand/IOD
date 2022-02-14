import React, { useEffect } from 'react';
import { useHistory } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import useReduxStore from '../../hooks/useReduxStore';
import { useParams } from 'react-router-dom';

function SelectedFavoriteProject() {
    const favoriteProject = useSelector((store) => store.favoriteProject);

    return (
        favoriteProject.image != null &&
            <div className="favProjects">
            <h2 className="fav-name">{favoriteProject.project_name}</h2>
            <div className="fav-info">
                <img className="fav-img" src={favoriteProject.image} alt="Place for Image" />
                <p>{favoriteProject.description}</p>
            </div>
            </div>
    );
}

export default SelectedFavoriteProject;