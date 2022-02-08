import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import {useDispatch, useSelector} from 'react-redux';

import PortfolioItem from "../PortfolioItem/PortfolioItem";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  boxShadow: 24,
  borderRadius: 3,
};

function StudentPortfolio() {
  const portfolio = useSelector((store) => store.portfolio);

  const [project, setProject] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSaveProjectButton = (event) => {
    event.preventDefault();
        setProject('');
        setOpen(false);
        const newProject = {
            project: project
        }
        dispatch({
            type: 'ADD_PROJECT',
            payload: newProject
        })
  };

  return (
    <div className="container">
      <h1>Portfolio</h1>
      <div>
        <IconButton id="add-skill-icon" onClick={handleOpen}>
          <AddIcon />
        </IconButton>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <center>
            <Box sx={style}>
              <form className="interior-box" onSubmit={handleSaveProjectButton}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Add a Project
                </Typography>
                <img
                  className="login-gradient"
                  src="gradient_bar.png"
                  draggable={false}
                />
                <input
                  className="skill-input"
                  placeholder="Title"
                  value={project}
                  onChange={(event) => setProject(event.target.value)}
                  required
                />

                <input
                  className="skill-input"
                  placeholder="Description"
                  value={project}
                  onChange={(event) => setProject(event.target.value)}
                  required
                />

                <input
                  className="skill-input"
                  placeholder="Image URL"
                  value={project}
                  onChange={(event) => setProject(event.target.value)}
                  required
                />
                <br />
                <button type="submit">Add Project</button>
              </form>
            </Box>
          </center>
        </Modal>
      </div>
      {Object.keys(portfolio).map((internship_id) => {
        return (
          <PortfolioItem
            key={internship_id}
            projects={portfolio[internship_id]}
          />
        );
      })}
    </div>
  );
}

export default StudentPortfolio;
