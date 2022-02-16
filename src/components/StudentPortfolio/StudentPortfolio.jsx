import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import PortfolioItem from "../PortfolioItem/PortfolioItem";
import './StudentPortfolio.css';

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DropzoneDialog } from 'material-ui-dropzone';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

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
  const dispatch = useDispatch();
  const portfolio = useSelector((store) => store.portfolio);
  const internships = useSelector((store) => store.internshipReducer);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [internship_id, setInternship_id] = useState("");
  const [open, setOpen] = React.useState(false);
  const [pictureOpen, setPictureOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    dispatch({
      type: 'FETCH_INTERNSHIPS'
    });
  }, [])

  const handleSaveProjectButton = (event) => {
    event.preventDefault();
    setTitle("");
    setDescription("");
    setImage("");
    setInternship_id("");
    setOpen(false);
    const newProject = {
      title: title,
      description: description,
      image: image,
      internship_id: internship_id
    };
    console.log(image);
    // dispatch({
    //   type: "ADD_PROJECT",
    //   payload: newProject,
    // });
    dispatch({
      type: 'UPLOAD_PROJECT',
      payload: {file: image, data: newProject}
    });
  };

  const handleEditPicture = (file) => {
    console.log(file);
    setImage(file);
  }

  return (
    <div className="container">
      <h1>Portfolio</h1>
      <div>
        <IconButton id="add-project-icon" onClick={handleOpen}>
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
                  className="project-input"
                  placeholder="Title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  required
                />

                <textarea
                  rows="4"
                  className="project-input project-description-input"
                  placeholder="Description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  required
                />

                {/* <input
                  className="project-input"
                  placeholder="Image URL"
                  value={image}
                  onChange={(event) => setImage(event.target.value)}
                  required
                /> */}

                <IconButton onClick={() => setPictureOpen(true)} id='image-select-btn'>
                  <AddPhotoAlternateIcon />
                </IconButton>
                <br />

                {/* project picture import dialogue */}
                <DropzoneDialog
                  acceptedFiles={['image/*']}
                  cancelButtonText={"cancel"}
                  submitButtonText={"submit"}
                  maxFileSize={5000000}
                  open={pictureOpen}
                  onClose={() => setPictureOpen(false)}
                  onSave={(files) => {
                    console.log('Files:', files[0]);
                    setPictureOpen(false);
                    handleEditPicture(files[0]);
                  }}
                  showPreviews={true}
                  showFileNamesInPreview={true}
                />

                <FormControl id='internship-id-dropdown' variant="standard">
                  <InputLabel>Internship</InputLabel>
                  <Select
                    value={internship_id}
                    label="Internship"
                    onChange={(e) => setInternship_id(e.target.value)}
                    required
                  >
                    {internships.map((internship) => {
                      return <MenuItem key={internship_id} value={internship.id}>{internship.company_name}</MenuItem>;
                    })}
                  </Select>
                </FormControl>

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
