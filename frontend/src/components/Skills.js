import { Button, Container, Divider, Grid, Typography, IconButton, Modal, TextField, Slider, FormLabel } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import SkillCard from './SkillCard';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';



const spaceStyle = { margin: 'auto' };
const textFieldStyle = { margin: "10px auto" }
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

function Skills(props) {

  const [modalOpen, setModalOpen] = useState(false);
  // const [hasSkills, setHasSkills] = useState(false);

  const isSkillEmpty = props;

  // function skillDisplay(isSkillEmpty) {
  //   if (isSkillEmpty == false) {
  //     console.log('No skills in ' + props.skillType);
  //     return null;

  //   } else if (isSkillEmpty == false) {
  //     console.log('No skills in ' + props.skillType)
  //     return null;

  //   } else if (isSkillEmpty == false) {
  //     console.log('No skills in ' + props.skillType)
  //     return null;
  //   } else {}

  // switch (isSkillEmpty) {
  //   case true:

  return (
    <Container>
      {/* <Grid container spacing={3}> 
            <Grid item sm={12} lg={3}> */}
      <Box component="div" sx={{
        width: '100%', height: 'fit-content', margin: '10px 5px',
        padding: '5px 5px', backgroundColor: 'primary',
        border: '1px solid grey', borderRadius: 4,
        '&:hover': {
          border: '1px solid rgb(252, 175, 40)',
          boxShadow: '1px 1px 18px 1px rgb(252, 175, 40)',
        },
      }}>

        {/* Skill Type Heading */}
        <Typography variant='h4' align='center'>{props.skillType} Skills</Typography>

        <Divider />


        {/* Skills */}
        <div>
          {/* map of skills */}

          <SkillCard skill_name={props.skill_name} />
          <SkillCard skill_name={props.skill_name} />

          <Divider />

          <Box style={dividerStyle}></Box>

          <Divider />

          {/* Add Skill Icon */}
          <Box sx={{ display: 'flex', alignItems: 'self-end', pl: 1, pb: 1, marginTop: '5px', margin: '5px 5px' }}>
            <IconButton color='secondary'>
              <AddCircleOutlineOutlinedIcon onClick={() => setModalOpen(true)} />
            </IconButton>
          </Box>
        </div>

      </Box>



      {/* ADD SKILL MODAL */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton sx={{ paddingLeft: 48, paddingTop: 0 }}>
            <CloseOutlinedIcon onClick={() => setModalOpen(false)} />
          </IconButton>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          {/* Add Skill */}
          <form>
            <TextField fullWidth label='Skill Name' color="secondary" placeholder="e.g., Project Management" required style={textFieldStyle} />
            <FormLabel>Rate you Compentncy Below</FormLabel>
            <Slider
              size="small"
              defaultValue={70}
              aria-label="Small"
              valueLabelDisplay="auto"
              color='primary'
            />
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