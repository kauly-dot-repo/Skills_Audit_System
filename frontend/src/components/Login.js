import React, { Component, useState } from 'react';
import {
  Container, Grid, Paper, Avatar, Typography, TextField, Button, FormControl, FormLabel, RadioGroup, Radio,
  FormControlLabel, Select, Checkbox, MenuItem, InputLabel
} from '@mui/material'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Link } from 'react-router-dom';
// import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import LoginIcon from '@mui/icons-material/Login';


function Login() {

  const paperStyle = { padding: '30px 20px', width: 'fit-content', margin: "50px auto" }
  const textFieldStyle = { margin: "10px auto" }
  const spacingStyle = { margin: "20px auto" }
  // const headerStyle = { margin: 0 }
  // const avatarStyle = { backgroundColor: '#1bbd7e' }
  // const marginTop = { marginTop: 5 }


  return (
    <Container>


      <Paper elevation={20} style={paperStyle}>

        {/* <Grid container>
          
          <Grid item></Grid>
        </Grid> */}

        <Typography
          variant="h2"
          color='primary'
          component="h2"
          gutterBottom
          align='center'
        >
          Login
        </Typography>

        <form>

          <Grid container spacing={4} align='center' direction='column' >
            <Grid item xs={12} md={6} lg={8}>
              <TextField fullWidth label='Email' placeholder="example@nust.na" required style={textFieldStyle} />
              <TextField fullWidth label='Password' placeholder="************" required style={textFieldStyle} />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <Typography>Don't have an account? <Link to='/register'>Register</Link></Typography>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>

              <FormControlLabel
                control={
                  <Checkbox
                    name="checkedB"
                    color="secondary"
                    // onChange={(e) => setCheckbox(e.target.value)}

                    // style={spacingStyle}
                  />
                }
                label="Remember Me"
              />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <Button type='submit' variant='contained' color='primary' endIcon={<LoginIcon />}>LOGIN</Button>
            </Grid>

          </Grid>

        </form>

      </Paper>
    </Container>
  )



}

export default Login;