import React, { Component, useState } from 'react';
import {
  Container, Grid, Paper, Avatar, Typography, TextField, Button, FormControl, 
  FormLabel, RadioGroup, Radio, FormControlLabel, Select, Checkbox, MenuItem, 
  InputLabel
} from '@mui/material'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Link } from 'react-router-dom';
// import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import LoginIcon from '@mui/icons-material/Login';
import axios from 'axios';
import { useHistory } from 'react-router';


function Login() {

  const paperStyle = { 
    padding: '30px 20px', 
    width: 'fit-content', 
    margin: "50px auto" 
  }
  const textFieldStyle = { margin: "10px auto" }
  // const spacingStyle = { margin: "20px auto" }
  // const headerStyle = { margin: 0 }
  // const avatarStyle = { backgroundColor: '#1bbd7e' }
  // const marginTop = { marginTop: 5 }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();


  function loginHandler(e) {
    e.preventDefault();

    axios.get(`http://localhost:8120/login/${email}/${password}`)
      .then((response) => {

        if (response.data == '') {
          alert('INVALID USERNAME OR PASSWORD, Try Again!')
        } 
        
        if (response.data.supervisor == false) {
          console.log('Login Response: ' + response.data.staffnumber);
          // alert(': User ' + email + ' Logged in successfully');
          console.log(response);
          localStorage.setItem('staffnumber', response.data.staffnumber);
          localStorage.setItem('supervisorStatus', response.data.supervisor);

          history.push('/profile');
        } else {
          console.log('Login Response: ' + response.data.staffnumber);
          // alert(': User ' + email + ' Logged in successfully');
          console.log(response);
          localStorage.setItem('staffnumber', response.data.staffnumber);
          localStorage.setItem('supervisorStatus', response.data.supervisor);

          history.push('/supervisor-profile');
        }
      })
  };

  return (
    <Container>

      <Paper elevation={20} style={paperStyle}>

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
              <TextField
                fullWidth label='Email' placeholder="example@nust.na"
                required style={textFieldStyle}
                onChange={(e) => { setEmail(e.target.value) }}
              />
              <TextField
                fullWidth label='Password' placeholder="************"
                required style={textFieldStyle} type='password'
                onChange={(e) => { setPassword(e.target.value) }}
              />
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
              <Button type='submit' variant='contained' color='primary' endIcon={<LoginIcon />}
                onClick={loginHandler}>LOGIN</Button>
            </Grid>

          </Grid>

        </form>

      </Paper>
    </Container>
  )



}

export default Login;