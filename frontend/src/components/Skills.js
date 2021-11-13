import { Button, Container, Divider, Grid, Typography, IconButton, Modal, TextField, Slider, FormLabel } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import SkillCard from './SkillCard';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined';
import axios from 'axios';


const buttonStyle = { 
  margin: '5px 0px 20px 0px',
  padding: '10px 50px'
}
const spaceStyle = { margin: 'auto' };
const textFieldStyle = { margin: "10px auto" }
const titleFieldStyle = { margin: "20px auto" }
const dividerStyle = { margin: "auto auto", height: '100px' }
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: 'white',
  border: '1px solid rgb(27, 44, 93)',
  boxShadow: '1px 1px 18px 1px rgb(27, 44, 93)',
  p: 4,
};
            // console.log('Is Subordinate: ', props.isSubordinate)

const background = { backgroundColor: '#fefefe'}

function Skills(props) {
  console.log('PROPS ARRAY: ', props);

  const [modalOpen, setModalOpen] = useState(false);
  // const [hasSkills, setHasSkills] = useState(false);

  const isSkillEmpty = props;

  const [skillname, setSkillName] = useState('');
  const [skillLevel, setSkillLevel] = useState('');
  // const [skill, setSkill] = useState('');

  const skillArray = props.skills;
  const subNumber = props.subNumber;
  const isSub = props.isSubordinate;

  console.log('SKILLS ARRAY: ', skillArray);


  function skillSubmitHandler() {
    console.log(skillname + " " + skillLevel + " " + props.skillType)

    if (props.skillType == "Field Specific") {
      console.log("I'm in Field Skills!!!")
      axios.post('http://localhost:8120/new-field-skill', {
        staffnumber: localStorage.getItem('staffnumber'),
        skill_name: skillname,
        emp_rating: skillLevel,
      }).then((response) => {
        console.log(response);
        console.log('Skillname ' + skillname + ' Skill Level: ' + skillLevel)
      })
    }
    else if (props.skillType == 'Job Specific') {
      console.log("I'm in the Job Skills!!!")
      axios.post('http://localhost:8120/new-job-skill', {
        staffnumber: localStorage.getItem('staffnumber'),
        skill_name: skillname,
        emp_rating: skillLevel,
      }).then((response) => {
        console.log(response);
        console.log('Skillname ' + skillname + ' Skill Level: ' + skillLevel)
      })
    }
    else if (props.skillType == 'Soft') {
      console.log("I'm in Soft Skills")
      axios.post('http://localhost:8120/new-soft-skill', {
        staffnumber: localStorage.getItem('staffnumber'),
        skill_name: skillname,
        emp_rating: skillLevel,
      }).then((response) => {
        console.log(response);
        console.log('Skillname ' + skillname + ' Skill Level: ' + skillLevel)
      })
    }
    else {
      console.log("I'm in OTHER Skills!!!!")
      axios.post('http://localhost:8120/new-other-skill', {
        staffnumber: localStorage.getItem('staffnumber'),
        skill_name: skillname,
        emp_rating: skillLevel,
      }).then((response) => {
        console.log(response);
        console.log('Skillname ' + skillname + ' Skill Level: ' + skillLevel)
      })
    }

    setModalOpen(false)
    window.location.reload();
  }


  return (
    <Container>
    {/* Skill Type Heading */}
      <div style={background}>
        <Typography variant='h4' 
        style={titleFieldStyle} 
        align='center'>{props.skillType} Skills</Typography>
      </div>
       
      <Divider />

      {/* Skills */}
      <Box component="div" sx={{
        width: '100%', height: '300px', margin: '10px 5px',
        padding: '5px 5px', backgroundColor: 'primary',
        border: '1px solid grey', borderRadius: 4,
        overflow: 'auto',
        '&:hover': {
          border: '1px solid rgb(252, 175, 40)',
          // boxShadow: '1px 1px 18px 1px rgb(252, 175, 40)',
        },
      }}>

        
        <Grid container spacing={0.5}>
          {/* map of skills */}
          {skillArray.map(skillItem => (
            <Grid item xs={12} sm={6} md={6} lg={12}>
            <SkillCard 
            skill={skillItem} 
            skill_type={props.skillType} 
            subNumber={subNumber}
            isSubordinate={isSub}
             />
            </Grid>
          ))}
        </Grid>

      </Box>

      {/* <Box sx={{
        display: 'flex', alignItems: 'self-end', pl: 1, pb: 1,
        marginTop: '5px', margin: '5px 5px', backgroundColor: 'primary'
      }}> */}
      <Typography align='center'>
        <Button
          variant='contained'
          align='center'
          color='secondary'
          endIcon={<AddCircleOutlineOutlinedIcon />}
          style={buttonStyle}
          onClick={() => setModalOpen(true)}
        >
          Add New Skill
        </Button>
      </Typography>
      {/* </Box> */}


      {/* ADD SKILL MODAL */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton sx={{ paddingLeft: 40, paddingTop: 0 }}>
            <CloseOutlinedIcon onClick={() => setModalOpen(false)} />
          </IconButton>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Enter {props.skillType} Skills Information
          </Typography>

          {/* Add Skill */}
          <form>
            <TextField
              fullWidth label='Skill Name' color="secondary"
              placeholder="e.g., Project Management"
              required style={textFieldStyle}
              onChange={(e) => { setSkillName(e.target.value) }}
            />

            <FormLabel>Rate Your Compentncy Below</FormLabel>
            <Slider
              size="small"
              defaultValue={0}
              aria-label="Small"
              valueLabelDisplay="auto"
              color='primary'
              onChange={(e) => { setSkillLevel(e.target.value) }}

            />

            {/* <TextField
              fullWidth label='SkillType' color="secondary"
              placeholder="e.g., Project Management"
              required style={textFieldStyle}
              onChange={(e) => { setSkill(e.target.value) }}
              // hidden
              value={props.skillType}
            /> */}

            <Box sx={{
              display: 'flex', alignItems: 'self-end',
              pl: 1, pb: 1, marginTop: '5px', margin: '5px 5px'
            }}
            >
              <IconButton color='secondary'>
                <PublishOutlinedIcon onClick={skillSubmitHandler} />
              </IconButton>
            </Box>

          </form>

        </Box>
      </Modal>

    </Container>
  ); //END OF RETURN STATEMENT

  // case false:
  //   return (
  //     <Container>

  //     </Container>
  //   );


}; //END OF COMPONENT




export default Skills;