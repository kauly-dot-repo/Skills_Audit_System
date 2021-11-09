import { Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Skills from '../components/Skills';
import axios from 'axios';

// const containerStyle = {
//   paddingTop: `calc(100% - ${})`
// }

function Profile(props) {

  const [isLoading, setIsLoading] = useState(true);
  const [employeeData, setEmployeeData] = useState(true);

  // Use Effect to fetch data
  useEffect(() => { //this will be executed by react but only under certain circumstances
    setIsLoading(true)

    axios.get(`http://localhost:8120/get-employee-skills/${localStorage.getItem('staffnumber')}`)
      .then(response => {
        setEmployeeData(response.data);
        console.log('EMPLOYEEE: ', employeeData);
        console.log('field skills: ', employeeData.fieldSkills);
        setIsLoading(false);
      });

  }, []); //array of dependencies (when to execute)

  if(isLoading) {
    return(
      <div>
      <center>
        <h1>LOADING...</h1>
      </center>
    </div>
    );

  } else {

    return (
      <div>
        <Header />
  
        <Container>
  
          <Grid container spacing={0}>
  
            <Grid item sm={12} lg={3}>
  
              <Skills skillType={'Field Specific'}  skills={employeeData.fieldSkills} />
  
            </Grid>
  
            <Grid item sm={12} lg={3}>
              <Skills skillType={'Job Specific'} skills={employeeData.jobSkills} />
            </Grid>
  
            <Grid item sm={12} lg={3}>
  
              <Skills skillType={'Soft'} skills={employeeData.jobSoftSkills} />
  
            </Grid>
  
            <Grid itemsm={12} lg={3}>
              <Skills skillType={'Other'} skills={employeeData.otherSkills} />
            </Grid>
  
          </Grid> 
  
            {/* <Grid item sm={12} lg={3}>
  
              <Skills skillType={'Field Specific'} />
  
            </Grid>
  
            <Grid item sm={12} lg={3}>
              <Skills skillType={'Job Specific'} />
            </Grid>
  
            <Grid item sm={12} lg={3}>
  
              <Skills skillType={'Soft'}  />
  
            </Grid>
  
            <Grid itemsm={12} lg={3}>
              <Skills skillType={'Other'} />
            </Grid>
          </Grid> */}
  
          
        </Container>
      </div>
    );

  }


  
}

export default Profile;