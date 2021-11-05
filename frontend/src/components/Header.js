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

const appbarLinks = [
  { name: 'Edit Profile', path: '/register' },
  { name: 'Home', path: '/profile' }
]

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
  marginRight: 'auto',
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
  marginRight: 'auto'
}
const titleStyle = {paddingLeft: 50}

function Header() {

  // const style = useStyles();
  const [rightOpen, setRightOpen] = useState(false);
  const [leftOpen, setLeftOpen] = useState(false);

  return (
    <div>

      <AppBar position='sticky' color='primary' maxWidth=''>

        <Container>
          <Toolbar disableGutters>

            {/* <Avatar style={avatarStyle} onClick={() => setLeftOpen(true)}>K</Avatar> */}
            <div style={logo}>
              <img src='https://www.nust.na/sites/default/files/nust_logoANDname-DARKBACKGROUND.png' alt="NUST LOGO" style={logo} />
              <Typography variant='body1' color='white' style={titleStyle}>Skills Audit System</Typography>
            </div>


            <Hidden smDown>
              {appbarLinks.map((item) => (
                <Link style={linkStyle} color='secondary' variant='button' underline='none' href={item.path}>
                  {item.name}
                </Link>
              ))}
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
            {appbarLinks.map((item) => (
              <ListItem>
                <Link style={linkStyle} color='primary' variant='button' underline='none' href={item.path}>
                  {item.name}
                </Link>
              </ListItem>
            ))}
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

          <List>
            {appbarLinks.map((item) => (
              <ListItem>
                <Link style={linkStyle} color='primary' variant='button' underline='none' href={item.path}>
                  {item.name}
                </Link>
              </ListItem>
            ))}
          </List>

          <Divider />

          <div style={spaceStyle}></div>

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