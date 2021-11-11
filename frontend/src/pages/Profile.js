import { Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Skills from '../components/Skills';
import axios from 'axios';

// const containerStyle = {
//   paddingTop: `calc(100% - ${})`
// }

const loadingStyle = {
  padding: 10
}
const loadingImage = {
  maxWidth: '90%',
  margin: ' 3px auto 3px 0px'
}

function Profile(props) {

  const [isLoading, setIsLoading] = useState(true);
  const [employeeData, setEmployeeData] = useState(true);

  // Use Effect to fetch data
  useEffect(() => { //this will be executed by react but only under certain circumstances
    setIsLoading(true)

    // if()

    axios.get(`http://localhost:8120/get-employee-skills/${localStorage.getItem('staffnumber')}`)
      .then(response => {
        setEmployeeData(response.data);
        console.log('EMPLOYEEE: ', employeeData);
        console.log('field skills: ', employeeData.fieldSkills);
        setIsLoading(false);
      });

  }, []); //array of dependencies (when to execute)

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
      <div>
        <Header>

          <Container>

            <Grid container spacing={0} justifyContent="center" 
            alignItems="center" 
            style={{  maxWidth: '100%' }}
            >

              <Grid item xs={12} md={6} lg={3} xl={3} align='center'>

                <Skills skillType={'Field Specific'} skills={employeeData.fieldSkills} />

              </Grid>

              <Grid item xs={12} md={6} lg={3} xl={3} align='center'>
                <Skills skillType={'Job Specific'} skills={employeeData.jobSkills} />
              </Grid>

              <Grid item xs={12} md={6} lg={3} xl={3} align='center'>

                <Skills skillType={'Soft'} skills={employeeData.jobSoftSkills} />

              </Grid>

              <Grid item xs={12} md={6} lg={3} xl={3} align='center'>
                <Skills skillType={'Other'} skills={employeeData.otherSkills} />
              </Grid>

            </Grid>
          </Container>

        </Header>
      </div>
    );

  }



}

export default Profile;