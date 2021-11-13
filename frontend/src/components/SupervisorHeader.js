import { withTheme } from '@emotion/react';

import {
  AppBar, Avatar, Container, Drawer, Link, Toolbar, Divider,
  Hidden, IconButton, SwipeableDrawer, List, ListItem, Button, Typography, CssBaseline, Paper, CardHeader, Card, CardActionArea, CardContent, Modal
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box } from '@mui/system';
import axios from 'axios';
import ViewUser from './ViewUser';
import Subordinates from './Subordinates';



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
const contentStyle = { paddingTop: '1000px' }
const titleStyle = { paddingLeft: 50, margin: '1px 1px' }
const drawerStyle = { padding: '100px' }

const loadingStyle = {
  padding: 10
}
const loadingImage = {
  maxWidth: '90%',
  margin: ' 3px auto 3px 0px'
}



function SupervisorHeader(props) {

  // const style = useStyles();
  const [isLoading, setIsLoading] = useState(false);

  const [rightOpen, setRightOpen] = useState(false);
  const [leftOpen, setLeftOpen] = useState(false);
  // const [modalOpen, setModalOpen] = useState(false);
  // const [employees, setEmployees] = useState();

  const employees = props.employeeArray

  console.log('SUB EMPLOYEES: ', employees)
  // const employeeObject = props.employee;

  function endSession() {
    localStorage.clear();
  }

  function deleteSkill() {

  }

  const [modalOpen, setModalOpen] = useState(false);
  function viewUser() {

  }

  // useEffect(() => {
  //   setIsLoading(true)
  //   axios.get(`http://localhost:8120/get-subordinates/${localStorage.getItem('staffnumber')}`)
  //     .then(response => {
  //       setEmployees(response.data)
  //       console.log('SUB RESPONSE', response);
  //       setIsLoading(false)
  //     })
  // }, [])

  // SUPERVISOR 
  // if (isLoading) {
  //   return (
  //     <div style={loadingStyle}>
  //       <center>
  //         <img src='https://flevix.com/wp-content/uploads/2019/12/Barline-Loading-Images-1.gif'
  //           alt='Loading...'
  //           style={loadingImage}

  //         />
  //         <Typography>Loading...</Typography>
  //       </center>
  //     </div>
  //   );
  // } else {

  return (
    <div>
      {/* SUPERVISOR HEADER */}

      <CssBaseline />
      <AppBar position='sticky' color='primary' maxWidth=''>

        <Toolbar disableGutters>
          <div style={logo}>
            <img src='https://www.nust.na/sites/default/files/nust_logoANDname-DARKBACKGROUND.png' alt="NUST LOGO" style={logo} />
            <Typography variant='body1' color='white' style={titleStyle}>Skills Audit System</Typography>
          </div>


          <Hidden smDown style={listStyle}>

            <Link style={linkStyle} color='secondary' variant='button' underline='none' href='/update' onClick={() => setLeftOpen(true)}>
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

            <ListItem>
              <Link style={linkStyle} color='primary' variant='button' underline='none' href='/update'>
                EDIT PROFILE
              </Link>
            </ListItem>
            <ListItem>
              <Link style={linkStyle} color='primary' variant='button' underline='none' href='#'>
                OPTIONS
              </Link>
            </ListItem>
            <ListItem>
              <Link style={linkStyle} color='primary' variant='button' underline='none' href='/'
                onClick={endSession}>
                LOG OUT
              </Link>
            </ListItem>
          </List>


        </SwipeableDrawer>

        <SwipeableDrawer open={leftOpen}
          onOpen={() => setLeftOpen(true)}
          onClose={() => setLeftOpen(false)}
          anchor='left'
          style={{ width: "2500px" }}
        >
          <div style={dividerStyle}>
            <IconButton>
              <ChevronLeftIcon onClick={() => setLeftOpen(false)} />
            </IconButton>
          </div>

          <Divider />


          <Avatar style={avatarStyle2} sx={{ width: 80, height: 80 }}>K</Avatar>


          <Divider />


          <Divider />

          <div style={spaceStyle}></div>
          {/* if they are a supervisor they will get this view */}

          <Divider />

          {/* Subordinates */}
          <Typography variant='h6'>
            Subordinates
          </Typography>

          <Box sx={{
            width: '90%', height: '35%', margin: '10px 5px',
            padding: '2px 2px', border: '1px solid grey',
            borderRadius: 4, overflow: 'auto'
          }}>

            {employees.map(emp => (
              <Subordinates employees={emp} />
            ))}

      </Box>



      <Divider />

      <Button
        variant='contained'
        color='primary'
        endIcon={<LogoutIcon />}
        sx={{
          borderRadius: 0,
        }}
        onClick={endSession}
      >
        LOG OUT
      </Button>

      <Divider />


    </SwipeableDrawer>

      </AppBar >

    <div>
      {/* <div className={classes.toolbar}></div> */}
      {props.children}
    </div>



  {/* END OF Outer div */ }
    </div >
  );

  // } //END OF useEffect else statement


} //END OF SupervisorHeader
export default SupervisorHeader;

