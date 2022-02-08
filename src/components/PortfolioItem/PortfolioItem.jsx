import React from "react";

import './PortfolioItem.css';

function PortfolioItem({projects}) {
    return (
        <div>
            <div className="projects">
                <img className="internship-logo" src={projects[0].company_logo} alt="Company Name"/>
                {projects.map((project) => {
                    return (
                        <div className="projects-sub">
                            <h2 className="projects-name">{project.project_name}</h2>
                            <div className="projects-info">
                                <img className="project-img" src={project.image} />
                                <p>{project.description}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
};

export default PortfolioItem;