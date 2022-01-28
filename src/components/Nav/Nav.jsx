import React from 'react';
import './Nav.css';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import { useHistory } from 'react-router-dom';

const drawerWidth = 240;

function Nav() {
  const history = useHistory();

  const user = useSelector((store) => store.user);

  const drawer = (
    <div>
      <img src='globe.png' />
      <List>
        {/* Profile link */}
        {user.id &&
          <ListItem button onClick={() => history.push('/user')}>
              <ListItemIcon>
                  <MailIcon />
              </ListItemIcon>
              <ListItemText primary="Profile"/>
          </ListItem>
        }
        {/* Internships link */}
        {user.id &&
          <ListItem button onClick={() => history.push('/')}>
              <ListItemIcon>
                  <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Internships"/>
          </ListItem>
        }
        {/* People link */}
        {user.id &&
          <ListItem button onClick={() => history.push('/')}>
              <ListItemIcon>
                  <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="People"/>
          </ListItem>
        }
        {/* About link */}
        {user.id &&
          <ListItem button onClick={() => history.push('/about')}>
              <ListItemIcon>
                  <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="About"/>
          </ListItem>
        }
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
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
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default Nav;
