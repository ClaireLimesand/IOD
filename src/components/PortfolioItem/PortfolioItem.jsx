import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import "./PortfolioItem.css";

import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from '@mui/icons-material/Edit';
import StarIcon from '@mui/icons-material/Star';
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

// material ui styles
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  boxShadow: 24,
  borderRadius: 3,
};

function PortfolioItem({ projects }) {
  const dispatch = useDispatch();

  // grab specific project to edit from reducer
  const projectToEdit = useSelector(store => store.projectToEdit);

  // allow student to add new projects by storing the data in these local states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [internship_id, setInternship_id] = useState("");
  const [open, setOpen] = React.useState(false);

  // opens and closes edit window
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // what happens on delete click
  const handleDeleteProjectButton = (id) => {
    console.log(id);
    dispatch({
      type: "DELETE_PROJECT",
      payload: id,
    });
  };

  // what happens on edit click
  const handleEdit = (id) => {
    dispatch({ type: 'FETCH_EDITED_PROJECT', payload: id})
    handleOpen();
  }

  // allows student to edit the data of the project
  const handleTitleChange = (e) => {
    dispatch({ type: 'CHANGE_TITLE', payload: e.target.value})
  };

  const handleDescriptionChange = (e) => {
    dispatch({ type: 'CHANGE_DESCRIPTION', payload: e.target.value})
  };

  const handleImageChange = (e) => {
    dispatch({ type: 'CHANGE_IMAGE', payload: e.target.value})
  };

  // what happens when the save the edit button is click
  const handleEditProjectButton = (event) => {
    event.preventDefault();
    setOpen(false);
    // send the new edited data to be updated on the database
    dispatch({
        type: 'EDIT_PROJECT',
        payload: {
          id: projectToEdit.id,
          name: projectToEdit.title,
          description: projectToEdit.description,
          image: projectToEdit.image,
          internship_id: projectToEdit.internship_id,
          user_id: projectToEdit.user_id
        }
    })
}; 

// what happens whe favorite button is clicked
const handleFavorite = (project) => {
  console.log(project);
  // send the favorited info to its on database table
  dispatch({ 
    type: 'STORE_FAVORITE_PROJECT',
    payload: {
          id: project.id,
          name: project.project_name,
          description: project.description,
          image: project.image,
          internship_id: project.internship_id,
          user_id: project.user_id
    }
  })
}

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
                  id="edit-skill-icon"
                  onClick={() => handleEdit(project.id)}
                >
                  <EditIcon />
                </IconButton>

                <IconButton
                  id="favorite-project-icon"
                  onClick={() => handleFavorite(project)}
                >
                  <StarIcon />
                </IconButton>

                <IconButton
                  id="delete-skill-icon"
                  onClick={() => {
                    handleDeleteProjectButton(project.id);
                  }}
                >
                  <ClearIcon />
                </IconButton>

                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <center>
                    <Box sx={style}>
                      <form
                        className="interior-box"
                        onSubmit={handleEditProjectButton}
                      >
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                        >
                          Edit {projectToEdit.title}
                        </Typography>
                        <img
                          className="login-gradient"
                          src="gradient_bar.png"
                          draggable={false}
                        />
                        <input
                          className="skill-input"
                          placeholder="Title"
                          value={projectToEdit.title || ""}
                          onChange={handleTitleChange}
                          required
                        />

                        <input
                          className="skill-input"
                          placeholder="Description"
                          value={projectToEdit.description}
                          onChange={handleDescriptionChange}
                          required
                        />

                        <input
                          className="skill-input"
                          placeholder="Image URL"
                          value={projectToEdit.image}
                          onChange={handleImageChange}
                          required
                        />

                        <br />
                        <button type="submit">Update</button>
                      </form>
                    </Box>
                  </center>
                </Modal>
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
