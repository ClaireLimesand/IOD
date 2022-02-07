import React from "react";
import { DropzoneDialog } from 'material-ui-dropzone';
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useDispatch } from "react-redux";
import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { ListItemIcon } from "@mui/material";
import "./UserItem.css";
import { Badge } from "@mui/material";
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { IconButton } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function UserItem({ dataItem }) {
  const useStyles = makeStyles(theme => createStyles({
    previewChip: {
      minWidth: 160,
      maxWidth: 210
    },
  }));
  const classes = useStyles();

  const dispatch = useDispatch();
  const [pictureOpen, setPictureOpen] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  const [editAbout, setEditAbout] = useState(false);
  const [about, setAbout] = useState(dataItem.about);

  const handleSubmit = () => {
    dispatch({
      type: 'FETCH_RESUME'
    });
  };

  const handleEditPicture = (file) => {
    console.log(file);

    dispatch({
      type: 'UPLOAD_PICTURE',
      payload: {file: file}
    });
  }

  const handleEditBanner = (file) => {
    console.log(file);

    dispatch({
      type: 'UPLOAD_BANNER',
      payload: {file: file}
    });
  }

  const handleEditResume = (file) => {
    console.log(file);

    dispatch({
      type: 'UPLOAD_RESUME',
      payload: {file: file}
    });
  }

  const handleLinkedClick = () => {
    window.open(dataItem.linkedin);
  };

  return (
    <div>
      <div className="head">
        <div className="top">
          <img className="banner" src={dataItem.banner} draggable={false} />
          <Badge
            badgeContent={
              <ListItemIcon>
                <EditIcon 
                  id="edit-banner-icon" 
                  onClick={() => setBannerOpen(true)}
                />
              </ListItemIcon>
            }
          >
          </Badge>
        </div>

        <div className="sub">
          <Stack direction="row" spacing={2}>
            <Avatar
              className="avatar"
              alt="profile_pic"
              src={dataItem.picture}
              sx={{ width: 200, height: 200 }}
            />
          <Badge
            badgeContent={
              <ListItemIcon>
                <EditIcon 
                  id="edit-picture-icon" 
                  onClick={() => setPictureOpen(true)}
                />
              </ListItemIcon>
            }
          >
          </Badge>
          </Stack>
          <div>
            <div className="name-pros">
              <h2 className="student-name">{dataItem.name}</h2>
              <p className="pronouns">{dataItem.pronouns}</p>
            </div>
            <p className="email">{dataItem.email}</p>
            {dataItem.linkedin &&
            <img src="linkedIn-icon.png" onClick={handleLinkedClick} className="profile-link" draggable={false} />
            }
          </div>

          <div className="resume">
            <button className="resume-input" onClick={() => setResumeOpen(true)}>Upload Resume</button>
            <button className="resume-button" onClick={handleSubmit}>View Resume</button>
          </div>
        </div>
      </div>

      {/* Profile pic import dialogue */}
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

      {/* Banner import dialogue */}
      <DropzoneDialog
        acceptedFiles={['image/*']}
        cancelButtonText={"cancel"}
        submitButtonText={"submit"}
        maxFileSize={5000000}
        open={bannerOpen}
        onClose={() => setBannerOpen(false)}
        onSave={(files) => {
          console.log('Files:', files[0]);
          setBannerOpen(false);
          handleEditBanner(files[0]);
        }}
        showPreviews={true}
        showFileNamesInPreview={true}
      />

      {/* Resume import dialogue */}
      <DropzoneDialog
        showPreviews={true}
        showPreviewsInDropzone={false}
        useChipsForPreview
        previewGridProps={{container: { spacing: 1, direction: 'row' }}}
        previewChipProps={{classes: { root: classes.previewChip } }}
        previewText="Selected files"
        cancelButtonText={"cancel"}
        submitButtonText={"submit"}
        maxFileSize={5000000}
        open={resumeOpen}
        onClose={() => setResumeOpen(false)}
        onSave={(files) => {
          console.log('Files:', files[0]);
          setResumeOpen(false);
          handleEditResume(files[0]);
        }}
      />

      <div className="about">
        <h3 className="about-text">About     
          <IconButton id="edit-about-icon" onClick={() => setEditAbout(!editAbout)}>
              <EditIcon />
          </IconButton>
        </h3>
        {!editAbout ?
          <p className="about-data">{dataItem.about}</p>
        :
          <form onSubmit={() => {
            dispatch({ type: 'EDIT_ABOUT', payload: about });
            setEditAbout(!editAbout);
            setAbout(dataItem.about);
          }}>
            <input 
              className="edit-about-input"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
            <IconButton type='submit'>
              <CheckIcon />
            </IconButton>

            <IconButton onClick={() => {
              setEditAbout(!editAbout);
              setAbout(dataItem.about);
            }}>
              <ArrowBackIcon />
            </IconButton>
          </form>
        }
      </div>
    </div>
  );
}

export default UserItem;
