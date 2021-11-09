import React, { Component, useState } from 'react';
import {
  Container, Grid, Paper, Avatar, Typography, TextField, Button, FormControl, FormLabel, RadioGroup, Radio,
  FormControlLabel, Select, Checkbox, MenuItem, InputLabel
} from '@mui/material'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';




function Register() {



  const paperStyle = {
    padding: '10px 20px',
    width: 'fit-content',
    margin: "15px auto"
  }
  const textFieldStyle = { margin: "10px auto" }
  const spacingStyle = { margin: "10px auto" }
  // const headerStyle = { margin: 0 }
  // const avatarStyle = { backgroundColor: '#1bbd7e' }
  // const marginTop = { marginTop: 5 }

  const [staffnumber, setStaffnumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmed, setConfirmed] = useState('');
  const [isSupervisor, setIsSupervisor] = useState(false);
  const [department, setDepartment] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [field, setField] = useState('');

  function handleRegister(e) {
    e.preventDefault();    

    if (password === confirmed) {
      axios.post('http://localhost:8120/register', {
        staffnumber: staffnumber,
        email: email,
        password: password,
        // confirmedPassword: confirmed,
        field: field,
        department: department,
        supervisor: isSupervisor == 'on' ? true : false,
        jobTitle: jobTitle
      }).then((response) => {
        alert(response);
        alert(': User ' + staffnumber + ' created')
        
      })
    } else {
      alert("Passwords Don't Match");
      // alert("Invalid Input");
    }



  };
  const departments = [
    // 'Department of Computing and Informatics',
    { key: 1, value: 'Department of Human Resources' },
    { key: 2, value: 'Department of Student Services' },
    { key: 3, value: 'Department of International Relations' },
    { key: 4, value: 'Department of Education' }
  ]

  function dataTrigger() {
    axios.post('http://localhost:8120/register',{
      staffnumber: 'staffnumber',
      email: 'email'
    })
  }

  return (
    <Container>

      <Paper elevation={20} style={paperStyle}>

        <Typography
          variant="h2"
          // color="textPrimary"
          component="h2"
          gutterBottom
          color='primary'
        >
          Register Here
        </Typography>

        <form noValidate autoComplete="off"> 

          <Grid container spacing={5} align='left' >
            {/* FIELDS / EMPLOYEE INFO */}
            <Grid item xs={12} md={8} lg={9}>
              <TextField
                fullWidth label='Staff Number' color="primary"
                placeholder="219000000" required
                style={textFieldStyle}
                onChange={(e) => { setStaffnumber(e.target.value) }}
              />
              <TextField
                fullWidth label='Email' color="primary"
                placeholder="example@nust.na" required
                style={textFieldStyle}
                onChange={(e) => { setEmail(e.target.value) }}
              />
              <TextField
                fullWidth label='Field' color="primary"
                placeholder="e.g., IT - Information Technology" required
                style={textFieldStyle}
                onChange={(e) => { setField(e.target.value) }}
              />
              <TextField
                fullWidth label='Job Title' color="primary"
                placeholder="e.g., Lecturer" required
                style={textFieldStyle}
                onChange={(e) => { setJobTitle(e.target.value) }}
              />
              <TextField
                fullWidth label='Password' color="primary" type='password'
                placeholder="************" required
                style={textFieldStyle}
                onChange={(e) => { setPassword(e.target.value) }}
              />
              <TextField
                fullWidth label='Confirm Password' color="primary" type='password'
                placeholder="************" required
                style={textFieldStyle}
                onChange={(e) => { setConfirmed(e.target.value) }}
              />
            </Grid>

            {/* SELECTIONS */}
            <Grid item xs={12} md={4} lg={3} style={spacingStyle}>
              <FormControl>
                <FormLabel>Select a Department</FormLabel>

                <RadioGroup onChange={(e) => {setDepartment(e.target.value)}}>
                  {departments.map((department) => (
                    <FormControlLabel key={department.key} value={department.value} control={<Radio color='secondary' />}
                      label={department.value} />
                  ))}
                  {/* <FormControlLabel value='money' control={<Radio color='secondary' />} label='Money' />
                  <FormControlLabel value='todos' control={<Radio color='secondary' />} label='Todos' />
                  <FormControlLabel value='reminders' control={<Radio color='secondary' />} label='Reminders' />
                  <FormControlLabel value='work' control={<Radio color='secondary' />} label='Work' /> */}
                </RadioGroup>
              </FormControl>

              <FormControlLabel
                control={
                  <Checkbox
                    name="checkedB"
                    color="secondary"
                    onChange={(e) => { setIsSupervisor(e.target.value) }}

                    style={spacingStyle}
                  />
                }
                label="Check this if you are a Supervisor?"
              />

              <Typography style={spacingStyle}>Already have an account? <Link to='/'>Log in</Link></Typography>


              <Button type='submit' variant='contained' color='primary' endIcon={<KeyboardArrowRightIcon />}
                onClick={handleRegister}>Register</Button>

                <Button onClick={dataTrigger}>DATA</Button>

            </Grid>
            {/* <TextField fullWidth label='staffnumber' placeholder="Enter your Staff Number" required/> */}


          </Grid>

        </form>

      </Paper>
    </Container>
  )



}

export default Register;