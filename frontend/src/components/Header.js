import { withTheme } from '@emotion/react';

import {
  AppBar, Avatar, Container, Drawer, Link, Toolbar, Divider,
  Hidden, IconButton, SwipeableDrawer, List, ListItem, Button, Typography
} from '@mui/material';
import React, { useState } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LogoutIcon from '@mui/icons-material/Logout';

// const drawerLinks = [
//   {name: 'Edit Profile', icon:  , path:''},
//   {name: 'Log Out', icon: '' , path:''},
// ]

// const appbarLinks = [
//   { name: 'Edit Profile', path: '/update' }
// ]

const linkStyle = {
  marginRight: 20,
  "&:hover": {
    color: 'secondary'
  }
}
const dividerStyle = {
  backgroundColor: 'primary'
}
const avatarStyle = {
  marginRight: '10px',
  color: 'primary',
  backgroundColor: 'secondary',
}

const avatarStyle2 = {
  margin: '25px auto',
  color: 'primary',
  backgroundColor: 'secondary',
}
const spaceStyle = { margin: 'auto' }

const logo = {
  maxWidth: 200,
  margin: ' 3px auto 3px 0px'
}

const listStyle = { marginLeft: 'auto' }
const titleStyle = { paddingLeft: 50, margin: '1px 1px' }

function Header() {

  // const style = useStyles();
  const [rightOpen, setRightOpen] = useState(false);
  const [leftOpen, setLeftOpen] = useState(false);

  function endSession() {
    localStorage.clear();
  }

  return (
    <div>

      <AppBar position='static' color='primary' maxWidth=''>

        <Container>
          <Toolbar disableGutters>

            

            <div style={logo}>
              <img src='https://www.nust.na/sites/default/files/nust_logoANDname-DARKBACKGROUND.png' alt="NUST LOGO" style={logo} />
              <Typography variant='body1' color='white' style={titleStyle}>Skills Audit System</Typography>
            </div>


            <Hidden smDown style={listStyle}>
              {/* {appbarLinks.map((item) => (
                <Link style={linkStyle} color='secondary' variant='button' underline='none' href={item.path}>
                  {item.name}
                </Link>
              ))} */}
              <Link style={linkStyle} color='secondary' variant='button' underline='none' href='/profile' onClick={() => setLeftOpen(true)}>
                EDIT PROFILE
              </Link>
              <Link style={linkStyle} color='secondary' variant='button' underline='none' href='/profile' onClick={() => setLeftOpen(true)}>
                OPTIONS
              </Link>
              <Link style={linkStyle} color='secondary' variant='button' underline='none' href='/' onClick={endSession}>
                LOG OUT
              </Link>


              <Avatar style={avatarStyle} onClick={() => setLeftOpen(true)}>2</Avatar>

              
            </Hidden>
            <Hidden smUp>
              <IconButton>
                <MenuIcon color='secondary' onClick={() => setRightOpen(true)} />
              </IconButton>
            </Hidden>
          </Toolbar>
        </Container>

        <SwipeableDrawer open={rightOpen}
          onOpen={() => setRightOpen(true)}
          onClose={() => setRightOpen(false)}
          anchor='right'>
          <div>
            <IconButton>
              <ChevronRightIcon onClick={() => setRightOpen(false)} />
            </IconButton>
          </div>

          <Divider />

          <List>
            {/* {appbarLinks.map((item) => (
              <ListItem>
                <Link style={linkStyle} color='primary' variant='button' underline='none' href={item.path}>
                  {item.name}
                </Link>
              </ListItem>
            ))} */}
            <ListItem>
              <Link style={linkStyle} color='primary' variant='button' underline='none' href='/update'>
                EDIT PROFILE
              </Link>
            </ListItem>
            <ListItem>
              <Link style={linkStyle} color='primary' variant='button' underline='none' href='/login'>
                OPTIONS
              </Link>
            </ListItem>
            <ListItem>
              <Link style={linkStyle} color='primary' variant='button' underline='none' href='/login'>
                LOG OUT
              </Link>
            </ListItem>
          </List>


        </SwipeableDrawer>

        <SwipeableDrawer open={leftOpen}
          onOpen={() => setLeftOpen(true)}
          onClose={() => setLeftOpen(false)}
          anchor='left'
        >
          <div style={dividerStyle}>
            <IconButton>
              <ChevronLeftIcon onClick={() => setLeftOpen(false)} />
            </IconButton>
          </div>

          <Divider />

          <Avatar style={avatarStyle2} sx={{ width: 70, height: 70 }}>K</Avatar>

          <Divider />

          {/* <List>
            {appbarLinks.map((item) => (
              <ListItem>
                <Link style={linkStyle} color='primary' variant='button' underline='none' href={item.path}>
                  {item.name}
                </Link>
              </ListItem>
            ))}
          </List> */}

          <Divider />

          <div style={spaceStyle}></div>
          {/* if they are a supervisor they will get this view */}



          {/* if not supervisor not */}



          <Divider />

          <Button
            variant='contained'
            color='primary'
            endIcon={<LogoutIcon />}
            sx={{
              borderRadius: 0,
            }}
            onClick={() => setLeftOpen(false)}
          >
            LOG OUT
          </Button>

          <Divider />

          
        </SwipeableDrawer>

      </AppBar>



    </div>
  );
}

export default Header;