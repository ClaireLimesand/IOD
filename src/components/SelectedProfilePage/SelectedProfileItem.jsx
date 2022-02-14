import React from "react";
import { DropzoneDialog } from 'material-ui-dropzone';
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useDispatch } from "react-redux";
import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { ListItemIcon } from "@mui/material";
import { Badge } from "@mui/material";
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { IconButton } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import SelectedSkillsPage from "./SelectedSkills";
import { useParams } from "react-router-dom";

function SelectedProfileItem({ dataItem }) {
    const useStyles = makeStyles(theme => createStyles({
        previewChip: {
        minWidth: 160,
        maxWidth: 210
    },
    }));
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory(); 
    const params = useParams();

    const [pictureOpen, setPictureOpen] = useState(false);
    const [bannerOpen, setBannerOpen] = useState(false);
    const [resumeOpen, setResumeOpen] = useState(false);

    const [editTop, setEditTop] = useState(false);
    const [name, setName] = useState(dataItem.name);
    const [email, setEmail] = useState(dataItem.email);
    const [linkedin, setLinkedin] = useState(dataItem.linkedin);
    const [pronouns, setPronouns] = useState(dataItem.pronouns);

    const [editAbout, setEditAbout] = useState(false);
    const [about, setAbout] = useState(dataItem.about);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: 3,
        p: 4,
    };

    const handleSubmit = () => {
        dispatch({
            type: 'FETCH_SPECIFIC_RESUME',
            payload: params.id
        });
    };

    const handleLinkedClick = () => {
        window.open(dataItem.linkedin);
    };

    const handlePortfolio = () => {
        history.push(`/portfolio/${params.id}`);
    };

return (
    <div>
        <div className="head">
            <div className="top">
                <img className="banner" src={dataItem.banner} draggable={false} />
            </div>

            <div className="sub">
                <Stack direction="row" spacing={2}>
                    <Avatar
                        className="avatar"
                        alt="profile_pic"
                        src={dataItem.picture}
                        sx={{ width: 200, height: 200 }}
                    />
                </Stack>
                <div>
                    <div className="name-pros">
                        <h2 className="student-name">{dataItem.name}</h2>
                        <p className="pronouns">{dataItem.pronouns}</p>
                    </div>
                    <p className="email">{dataItem.email}</p>
                    <button className="portfolio-button" onClick={handlePortfolio}>
                        Portfolio
                    </button>
                    {dataItem.linkedin &&
                    <img src="linkedIn-icon.png" onClick={handleLinkedClick} className="profile-link" draggable={false} />
                    }
                </div>

                <div className="resume">
                    <button className="resume-button" onClick={handleSubmit}>View Resume</button>
                </div>
            </div>
        </div>

        <div className="about">
            <h3 className="about-text">About</h3>
            {!editAbout ?
                <p className="about-data">{dataItem.about}</p>
            :
                <form onSubmit={handleEditAbout}>
                    <input 
                        className="edit-about-input"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                    />
                </form>
            }
        </div>
    </div>
);
}

export default SelectedProfileItem;
