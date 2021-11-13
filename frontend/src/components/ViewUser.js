import { Container, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Skills from './Skills';



const loadingStyle = {
  padding: 10
}
const loadingImage = {
  maxWidth: '90%',
  margin: ' 3px auto 3px 0px'
}


function ViewUser(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [employeeData, setEmployeeData] = useState(true);

  const emp = props.employee;

  useEffect(() => { //this will be executed by react but only under certain circumstances
    setIsLoading(true)

    axios.get(`http://localhost:8120/get-employee-skills/${emp.staffnumber}`)
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

    switch (props.skillType) {
      case 'Field Specific':
        return (
          <div>
            <Typography variant='h6'>User Number {emp.staffnumber}</Typography>

            <Container>

              <Grid container spacing={0} justifyContent="center"
                alignItems="center"
                style={{ maxWidth: '100%' }}
              >

                <Grid item xs={12} lg={12} align='center'>

                  <Skills
                    skillType={props.skillType}
                    skills={employeeData.fieldSkills}
                    subNumber={emp.staffnumber}
                  />

                </Grid>

              </Grid>
            </Container>


          </div>
        );
        break;

      case 'Job Specific':
        return (
          <div>
            <Typography variant='h6'>User Number {emp.staffnumber}</Typography>

            <Container>

              <Grid container spacing={0} justifyContent="center"
                alignItems="center"
                style={{ maxWidth: '100%' }}
              >

                <Grid item xs={12} lg={12} align='center'>

                  <Skills
                    skillType={props.skillType}
                    skills={employeeData.jobSkills}
                    subNumber={emp.staffnumber}
                  />

                </Grid>
              </Grid>
              
            </Container>


          </div>
        );
        break;


      default:
        return (
          <div>
            <Typography variant='h6'>User Number {emp.staffnumber}</Typography>

            <Container>

              <Grid container spacing={0} justifyContent="center"
                alignItems="center"
                style={{ maxWidth: '100%' }}
              >

                <Grid item xs={12} lg={12} align='center'>

                  <Skills
                    skillType={props.skillType}
                    skills={employeeData.jobSoftSkills}
                    subNumber={emp.staffnumber}
                  />

                </Grid>

              </Grid>
            </Container>


          </div>
        );
        break;
    }


  }
}

export default ViewUser;