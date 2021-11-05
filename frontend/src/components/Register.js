import React, { Component, useState } from 'react';
import {
  Container, Grid, Paper, Avatar, Typography, TextField, Button, FormControl, FormLabel, RadioGroup, Radio,
  FormControlLabel, Select, Checkbox, MenuItem, InputLabel
} from '@mui/material'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Link } from 'react-router-dom';
// import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';




function Register() {

  

  const paperStyle = { padding: '30px 20px', width: 'fit-content', margin: "50px auto" }
  const textFieldStyle = { margin: "10px auto" }
  const spacingStyle = { margin: "20px auto" }
  // const headerStyle = { margin: 0 }
  // const avatarStyle = { backgroundColor: '#1bbd7e' }
  // const marginTop = { marginTop: 5 }

  // const [staffnumber, setStaffnumber] = useState('');
  // const [password, setPassword] = useState('');
  // const [checkbox, setCheckbox] = useState(false);
  // const [department, setDepartment] = useState('');
  // const [jobTitle, setJobTitle] = useState('');
  // const [field, setField] = useState('');

  // let jobTitles = [];

  // const fields = [
  //   {
  //     value: 'IT',
  //     label: 'IT - Information Technology'
  //   },
  //   {
  //     value: 'HR',
  //     label: 'HR - Human Resources'
  //   }
  // ];

  const departments = [

    // 'Department of Computing and Informatics',
    { key: 1, value: 'Department of Human Resources' },
    { key: 2, value: 'Department of Student Services' },
    { key: 3, value: 'Department of International Relations' }

  ]




  return (
    <Container>


      <Paper elevation={20} style={paperStyle}>

        {/* <Grid container>
          
          <Grid item></Grid>
        </Grid> */}

        <Typography
          variant="h2"
          // color="textPrimary"
          component="h2"
          gutterBottom
          color='primary'
        >
          Register here
        </Typography>

        <form>

          <Grid container spacing={5} align='left' >
            <Grid item xs={12} md={8} lg={9}>
              <TextField fullWidth label='email' color="primary" placeholder="example@nust.na" required style={textFieldStyle} />
              {/* <TextField fullWidth label='department' placeholder="Enter your Department" required style={textFieldStyle} /> */}
              <TextField fullWidth label='field' color="primary" placeholder="e.g., IT - Information Technology"  required style={textFieldStyle} />
              <TextField fullWidth label='jobTitle' color="primary" placeholder="e.g., Lecturer" required style={textFieldStyle} />
              <TextField fullWidth label='Password' color="primary" placeholder="************" required style={textFieldStyle} />
              <TextField fullWidth label='Confirm Password' color="primary" placeholder="************" required style={textFieldStyle} />
            </Grid>

            <Grid item xs={12} md={4} lg={3} style={spacingStyle}>
              <FormControl>
                <FormLabel>Select a Department</FormLabel>

                <RadioGroup >
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
                    // onChange={(e) => setCheckbox(e.target.value)}

                    style={spacingStyle}
                  />
                }
                label="Check this if you are a Supervisor?"
              />

              <Typography style={spacingStyle}>Already have an account? <Link to='/login'>Log in</Link></Typography>


              <Button type='submit' variant='contained' color='primary' endIcon={<KeyboardArrowRightIcon />}>Register</Button>

            </Grid>
            {/* <TextField fullWidth label='staffnumber' placeholder="Enter your Staff Number" required/> */}


          </Grid>

        </form>

      </Paper>
    </Container>
  )



}

export default Register;