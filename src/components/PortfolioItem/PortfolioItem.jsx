import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Swal from 'sweetalert2';

import "./PortfolioItem.css";

import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from '@mui/icons-material/Edit';
import StarIcon from '@mui/icons-material/Star';
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
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

function PortfolioItem({ projects }) {
  const dispatch = useDispatch();

  const projectToEdit = useSelector(store => store.projectToEdit);
  const internships = useSelector((store) => store.internshipReducer);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [internship_id, setInternship_id] = useState("");
  const [open, setOpen] = React.useState(false);
  const [pictureOpen, setPictureOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDeleteProjectButton = (id) => {
    console.log(id);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#15B097',
      cancelButtonColor: '#cf3123',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
              
            Toast.fire({
                icon: 'success',
                title: 'Deleted successfully'
            })
            dispatch({
              type: "DELETE_PROJECT",
              payload: id,
            });
        }
    })
  };

  const handleEdit = (id) => {
    dispatch({ type: 'FETCH_EDITED_PROJECT', payload: id})
    handleOpen();
  }

  const handleTitleChange = (e) => {
    dispatch({ type: 'CHANGE_TITLE', payload: e.target.value})
  };

  const handleDescriptionChange = (e) => {
    dispatch({ type: 'CHANGE_DESCRIPTION', payload: e.target.value})
  };

  const handleEditPicture = (file) => {
    console.log(file);
    setImage(file);
  }

  const handleEditProjectButton = (event) => {
    event.preventDefault();
    setOpen(false);
    dispatch({
        type: 'EDIT_PROJECT',
        payload: {
          id: projectToEdit.id,
          name: projectToEdit.title,
          description: projectToEdit.description,
          file: image,
          internship_id: internship_id,
          user_id: projectToEdit.user_id
        }
    })
}; 

const handleFavorite = (project) => {
  console.log(project);
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

                        <textarea
                          rows="4"
                          className="project-input project-description-input"
                          placeholder="Description"
                          value={projectToEdit.description}
                          onChange={(e) => handleDescriptionChange(e)}
                          required
                        />

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
