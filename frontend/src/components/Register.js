import React, { Component, useEffect, useState } from 'react';
import {
  Container, Grid, Paper, Avatar, Typography, TextField, Button, FormControl, FormLabel, RadioGroup, Radio,
  FormControlLabel, Select, Checkbox, MenuItem, InputLabel, List, ListItem
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
  const [supervisorNo, setSupervisorNo] = useState('');
  const [isSupervisor, setIsSupervisor] = useState(false);
  const [department, setDepartment] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [field, setField] = useState('');
  const [employees, setEmployees] = useState([]);

  const loadingStyle = {
    padding: 10
  }
  const loadingImage = {
    maxWidth: '90%',
    margin: ' 3px auto 3px 0px'
  }

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
        supervisorNo: supervisorNo,
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

  // function dataTrigger() {
  //   axios.post('http://localhost:8120/register', {
  //     staffnumber: 'staffnumber',
  //     email: 'email'
  //   })
  // }
  const [isLoading, setIsLoading] = useState(true);

  

  useEffect(() => {
    setIsLoading(true)

    axios.get('http://localhost:8120/getAllEmployees')
      .then(response => {
        setEmployees(response.data)
        // return staffNumbers;
        console.log('Staff Numbers', employees);
        setIsLoading(false)
      });

  }, []);

  if (isLoading) {
    return (
      <div style={loadingStyle}>
        <center>
          <img src='https://flevix.com/wp-content/uploads/2019/12/Barline-Loading-Images-1.gif'
            alt='Loading...'
            style={loadingImage}

          />
          <Typography>Loading...</Typography>
        </center>
      </div>
    );
  } else {
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

            <Grid container spacing={1.5} align='left' >

              {/* FIELDS / EMPLOYEE INFO */}
              <Grid item xs={12} md={12} lg={12}>
                <TextField
                  fullWidth label='Staff Number' color="primary"
                  placeholder="219000000" required
                  style={textFieldStyle}
                  onChange={(e) => { setStaffnumber(e.target.value) }}
                />
              </Grid>

              <Grid item xs={12} md={4} lg={9}>
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
              </Grid>

              {/* Select Supervisor */}
              <Grid item xs={12} md={4} lg={9}>
                <FormControl fullWidth style={textFieldStyle}>
                  <InputLabel>Supervisor</InputLabel>
                  <Select
                    placeholder={'219000000'}
                    label='Supervisor'
                  onChange={(e) => setSupervisorNo(e.target.value)}
                  >
                    {employees.map(emp => (
                      <MenuItem value={emp.staffnumber}>{emp.staffnumber}</MenuItem>
                    ))}
                    {/* <MenuItem value={'219000000'}>Kauly Peter - 219000000</MenuItem>
                  <MenuItem value={'219000002'}>Random User - 219000002</MenuItem> */}
                  </Select>
                </FormControl>
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
                <FormControl style={textFieldStyle}>
                  <FormLabel>Select a Department</FormLabel>

                  <RadioGroup onChange={(e) => { setDepartment(e.target.value) }}>
                    {departments.map((department) => (
                      <FormControlLabel key={department.key} value={department.value} control={<Radio color='secondary' />}
                        label={department.value} />
                    ))}

                  </RadioGroup>
                </FormControl>

              </Grid>

              <Grid item xs={12} md={12} lg={12}>
                <Typography style={spacingStyle} align='center'>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="checkedB"
                        color="secondary"
                        value={isSupervisor}
                        onChange={(e) => { setIsSupervisor(e.target.value) }}

                        style={spacingStyle}
                      />
                    }
                    label="Check this if you are a Supervisor?"
                  />
                </Typography>
                <Typography style={spacingStyle} align='center'>Already have an account? <Link to='/'>Log in</Link></Typography>

                <Typography style={spacingStyle} align='center'>
                  <Button type='submit' variant='contained' color='primary' endIcon={<KeyboardArrowRightIcon />}
                    onClick={handleRegister}
                  >
                    Register
                  </Button>
                </Typography>
              </Grid>


            </Grid>

          </form>


        </Paper>
      </Container>

    )
  }


}

export default Register;