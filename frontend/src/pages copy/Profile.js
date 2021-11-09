import { Container, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import Header from '../components/Header';
import Skills from '../components/Skills';


let jobSkill = [
  { skill_name: 'Change Management', emp_rating: '', sup_rating: '' },
  { skill_name: 'Performance Management', emp_rating: '', sup_rating: '' },
  { skill_name: 'Strategy Execution', emp_rating: '', sup_rating: '' },
  { skill_name: 'Employee Training', emp_rating: '', sup_rating: '' },
  { skill_name: 'Talent Management', emp_rating: '', sup_rating: '' },
  { skill_name: 'Job Analysis and Design', emp_rating: '', sup_rating: '' }
];
let jobSoftSkills = [
  { skill_name: 'Change Management', emp_rating: '', sup_rating: '' }
];
let fieldSkill = [
  { skill_name: 'Talent Acquisition', emp_rating: '70', sup_rating: '67' },
  { skill_name: 'Employee Relations', emp_rating: '89', sup_rating: '88' },
  { skill_name: '', emp_rating: '', sup_rating: '' }
];
let otherSkill = [
  { skill_name: '', emp_rating: '' },
  { skill_name: '', emp_rating: '' }
];

let skillsHRDP = [jobSkill, jobSoftSkills, fieldSkill, otherSkill]


console.log('---- Job SKILLS ----' + jobSkill.skill_name)



function Profile(props) {

  const [hasSkills, setHasSkills] = useState(false);

  // const skillsHandler = hasSkills => {
  //   if (skillsHRDP.length() !== 0) {
  //     setHasSkills(true)
  //     console.log('HAS SKILLS?: ' + hasSkills);
  //     return hasSkills;
  //   }
  // }

  return (

    
    <div>
      <Header />

      <Container>
        <Grid container spacing={0}>
          <Grid item sm={12} lg={3}>
                     
            <Skills skillType={'Field Specific'} skill_name={'Conflict Management'} />

          </Grid>

          <Grid item sm={12} lg={3}>
            <Skills skillType={'Job Specific'} />
          </Grid>

          <Grid item sm={12} lg={3}>
                     
            <Skills skillType={'Soft'} skill_name={'Conflict Management'} />

          </Grid>

          <Grid itemsm={12} lg={3}>
            <Skills skillType={'Other'} />
          </Grid>
        </Grid>
        {/* <Typography variant='body1'>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
          took a galley of type and scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
        </Typography> */}
      </Container>
    </div>
  );
}

export default Profile;