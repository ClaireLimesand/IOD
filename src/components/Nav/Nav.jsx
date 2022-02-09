import React from 'react';
import './Nav.css';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useHistory } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { useDispatch } from 'react-redux';

const drawerWidth = 240;

function Nav() {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  const drawer = (
    <div>
      <img src='globe.png' draggable='false' />
      <center id='sidebar-logo-text'>INTERNSHIP ON DEMAND</center>
      <img src='gradient_bar.png' draggable='false' />
      <List>
        {/* Home link */}
        {user.id &&
          <ListItem button onClick={() => history.push('/home')}>
              <ListItemIcon>
                <HomeIcon sx={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary="Home"/>
          </ListItem>
        }
        {/* Profile link */}
        {user.id &&
          <ListItem button onClick={() => history.push('/user')}>
              <ListItemIcon>
                <AccountCircleIcon sx={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary="Profile"/>
          </ListItem>
        }
        {/* Internships link */}
        {user.id &&
          <ListItem button onClick={() => history.push('/internships')}>
              <ListItemIcon>
                <WorkIcon sx={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary="Internships"/>
          </ListItem>
        }
        {/* Students link */}
        {user.id &&
          <ListItem button onClick={() => history.push('/students')}>
              <ListItemIcon>
                <PeopleIcon sx={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary="Students"/>
          </ListItem>
        }
        {/* About link */}
          <ListItem button onClick={() => history.push('/about')}>
              <ListItemIcon>
                <HelpCenterIcon sx={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary="About"/>
          </ListItem>
        {/* Logout link */}
        {user.id ?
          <ListItem button onClick={() => dispatch({ type: 'LOGOUT' })}>
              <ListItemIcon>
                <LogoutIcon sx={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary="Logout"/>
          </ListItem>
        :
          <ListItem button onClick={() => history.push('/user')}>
              <ListItemIcon>
                <LoginIcon sx={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary="Login"/>
          </ListItem>
        }
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }} >
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
          id="sidebar"
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default Nav;
