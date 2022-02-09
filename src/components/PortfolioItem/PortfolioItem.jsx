import React from "react";
import { useDispatch } from "react-redux";

import "./PortfolioItem.css";

import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";

function PortfolioItem({ projects }) {
    const dispatch = useDispatch();

    const handleDeleteProjectButton = (id) => {
        console.log(id);
        dispatch({
            type: 'DELETE_PROJECT',
            payload: id 
        })
    };

  return (
    <div>
      <div className="projects">
        <img
          className="internship-logo"
          src={projects[0].company_logo}
          alt="Company Name"
        />
        {projects.map((project) => {
          return (
            <div className="projects-sub" key={project.id}>
              <div className="projects-header">
                <h2 className="projects-name">{project.project_name}</h2>
                <IconButton
                  id="delete-skill-icon"
                  onClick={() => {
                    handleDeleteProjectButton(project.id);
                  }}
                >
                  <ClearIcon />
                </IconButton>
              </div>
              <div className="projects-info">
                <img className="project-img" src={project.image} />
                <p>{project.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PortfolioItem;
