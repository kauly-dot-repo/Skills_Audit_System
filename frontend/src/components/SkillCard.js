import {
  Avatar, Button, Card, CardContent, CardHeader, CardMedia,
  Container, FormLabel, Grid, IconButton, Modal, Slider, TextField,
  Typography, useTheme
} from '@mui/material';

import { Box } from '@mui/system';
import React, { useState } from 'react';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined';

import axios from 'axios';




function SkillCard(props) {

  const theme = useTheme();
  const skillObject = props.skill;

  const [ratingModalOpen, setRatingModalOpen] = useState(false);
  const [supModalOpen, setSupModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [skillModalOpen, setSkillModalOpen] = useState(false);
  // const [skillname, setSkillName] = useState('');
  const [skillLevel, setSkillLevel] = useState('');
  const [supRating, setSupRating] = useState('');

  // Styling
  const textFieldStyle = { margin: "10px auto" }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    backgroundColor: 'white',
    border: '1px solid rgb(27, 44, 93)',
    boxShadow: '1px 1px 18px 1px rgb(27, 44, 93)',
    p: 4,
  };
  const emphasisStyle = {
    textDecoration: 'underline',
    // '&:hover': {color: 'rgb(27, 44, 93)'}
  }

  const buttonStyle = {
    margin: '20px auto 10px auto'
  }



  function editSkill() {
    if (props.skill_type == "Field Specific") {
      console.log("I'm in Field Skills!!!")
      axios.post('http://localhost:8120/update-field-rating', {
        staffnumber: localStorage.getItem('staffnumber'),
        skill_name: skillObject.skill_name,
        emp_rating: skillLevel,
      }).then((response) => {
        console.log('RESPONSE', response);
        console.log('Skillname ' + skillObject.skill_name + ' Skill Level: ' + skillLevel)
      })
    } else if (props.skill_type == "Job Specific") {
      console.log("I'm in Job Skills!!!")
      axios.post('http://localhost:8120/update-job-rating', {
        staffnumber: localStorage.getItem('staffnumber'),
        skill_name: skillObject.skill_name,
        emp_rating: skillLevel,
      }).then((response) => {
        console.log('RESPONSE', response);
        console.log('Skillname ' + skillObject.skill_name + ' Skill Level: ' + skillLevel)
      })
    } else if (props.skill_type == "Soft") {
      console.log("I'm in Soft Skills!!!")
      axios.post('http://localhost:8120/update-soft-rating', {
        staffnumber: localStorage.getItem('staffnumber'),
        skill_name: skillObject.skill_name,
        emp_rating: skillLevel,
      }).then((response) => {
        console.log('RESPONSE', response);
        console.log('Skillname ' + skillObject.skill_name + ' Skill Level: ' + skillLevel)
      })
    } else {
      console.log("I'm in Other Skills!!!")
      axios.post('http://localhost:8120/update-other-rating', {
        staffnumber: localStorage.getItem('staffnumber'),
        skill_name: skillObject.skill_name,
        emp_rating: skillLevel,
      }).then((response) => {
        console.log('RESPONSE', response);
        console.log('Skillname ' + skillObject.skill_name + ' Skill Level: ' + skillLevel)
      })
    }

    console.log(skillObject.skill_name, 'Edited')

    window.location.reload();


  };


  const subNumber = props.subNumber;
  const isSub = props.isSubordinate;

  function supervisorRating() {
    if (props.skill_type == "Field Specific") {
      console.log("Supervisor in Field Skills!!!")
      axios.post('http://localhost:8120/supervisor-field-rating', {
        staffnumber: subNumber,
        skill_name: skillObject.skill_name,
        sup_rating: supRating,
      }).then((response) => {
        console.log('RESPONSE', response);
        console.log('Skillname ' + skillObject.skill_name + ' Supervisor Rating: ' + supRating)
      })
    } else if (props.skill_type == "Job Specific") {
      console.log("Supervisor in Job Skills!!!")
      axios.post('http://localhost:8120/supervisor-job-rating', {
        staffnumber: subNumber,
        skill_name: skillObject.skill_name,
        sup_rating: supRating,
      }).then((response) => {
        console.log('RESPONSE', response);
        console.log('Skillname ' + skillObject.skill_name + ' Supervisor Rating: ' + supRating)
      })
    } else {
      console.log("Supervisor in Soft Skills!!!")
      axios.post('http://localhost:8120/supervisor-soft-rating', {
        staffnumber: subNumber,
        skill_name: skillObject.skill_name,
        sup_rating: supRating,
      }).then((response) => {
        console.log('RESPONSE', response);
        console.log('Skillname ' + skillObject.skill_name + ' Supervisor Rating: ' + supRating)
      })
    }

    console.log(skillObject.skill_name, 'Rated by Supervisor')

    // window.location.reload();
  };


  function deleteSkill(e) {
    e.preventDefault();

    if (props.skill_type == "Field Specific") {
      console.log("I'm in Field Skills!!!")
      axios.post('http://localhost:8120/delete-field-skill', {
        staffnumber: localStorage.getItem('staffnumber'),
        skill_name: skillObject.skill_name,
        emp_rating: skillLevel,
        sup_rating: skillObject.sup_rating
      }).then((response) => {
        console.log('RESPONSE', response);
        // console.log('Skillname ' + skillObject.skill_name + ' Skill Level: ' + skillLevel)
      })
    } else if (props.skill_type == "Job Specific") {
      console.log("I'm in Job Skills!!!")
      axios.post('http://localhost:8120/delete-job-skill', {
        staffnumber: localStorage.getItem('staffnumber'),
        skill_name: skillObject.skill_name,
        emp_rating: skillLevel,
        sup_rating: skillObject.sup_rating
      }).then((response) => {
        console.log('RESPONSE', response);
        // console.log('Skillname ' + skillObject.skill_name + ' Skill Level: ' + skillLevel)
      })
    } else if (props.skill_type == "Soft") {
      console.log("I'm in Soft Skills!!!")
      axios.post('http://localhost:8120/delete-soft-skill', {
        staffnumber: localStorage.getItem('staffnumber'),
        skill_name: skillObject.skill_name,
        emp_rating: skillLevel
        // sup_rating: skillObject.sup_rating
      }).then((response) => {
        console.log('RESPONSE', response);
        // console.log('Skillname ' + skillObject.skill_name)
      })
    } else {
      console.log("I'm in Other Skills!!!")
      axios.post('http://localhost:8120/delete-other-skill', {
        staffnumber: localStorage.getItem('staffnumber'),
        skill_name: skillObject.skill_name,
        emp_rating: skillLevel,
        sup_rating: skillObject.sup_rating
      }).then((response) => {
        console.log('RESPONSE', response);
        // console.log('Skillname ' + skillObject.skill_name)
      })
    }


    console.log('DELETED', skillObject.skill_name, ' from ', props.skill_type, ' skills');
    // window.location.reload();
  }

  // const emp = props.employee;
  
  return (


    <div>

      <Card elevation={3} sx={{
        display: 'flex', flexDirection: 'column',
        margin: '10px 5px', padding: '5px 5px', backgroundColor: 'primary',
        border: '1px solid grey', borderRadius: 2,

        '&:hover': {
          border: '1px solid rgb(27, 44, 93)',
          boxShadow: '1px 1px 18px 1px rgb(27, 44, 93)',
        },
      }}

      >
        {/* Card Header - Title and Delte Icon */}
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          {/* <CardMedia
            avatar={
              <Avatar sx={{ bgcolor: 'error'}}>
                K
              </Avatar>
            }
          /> */}
          <CardHeader
            action={
              <IconButton color='primary' sx={{ padding: '5px 5px' }}
                onClick={() => { setDeleteModalOpen(true) }}>
                {/* <IconButton> */}
                <DeleteOutlinedIcon />
              </IconButton>
            }
            titleTypographyProps={{ variant: 'h6' }}
            title={skillObject.skill_name}

          />
        </Box>


        {/* Card Content */}
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>

          <CardContent sx={{ display: 'flex', flexDirection: 'row' }}
            onClick={() => {
              console.log('Is Subordinate: ', isSub)
              isSub == true ? setSupModalOpen(true) : setRatingModalOpen(true)
            }}
          >
            <div>
              <Typography variant="caption" color="primary" component="div"
                sx={{ marginRight: 1 }}
              // onClick={() => setRatingModalOpen(true)}
              >
                Employee Rating:
                <Typography variant='body1' color='error'>
                  {skillObject.emp_rating}
                </Typography>
              </Typography>
            </div>

            <div>
              <Typography variant="caption" color="primary" component="div"
                sx={{ marginLeft: 1 }}

              >
                Supervisor Rating:
                <Typography variant='body1' color='error'>
                  {skillObject.sup_rating}
                </Typography>
              </Typography>
            </div>
          </CardContent>


        </Box>

      </Card>

      {/* UPDATE RATING MODAL */}
      <Modal
        open={ratingModalOpen}
        onClose={() => setRatingModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton sx={{ paddingLeft: 51, paddingTop: 0 }}>
            <CloseOutlinedIcon onClick={() => setRatingModalOpen(false)} />
          </IconButton>
          <Typography id="modal-modal-title" variant="h5" component="h2"
            color='primary' style={textFieldStyle}
          >
            Update {props.skill_type} Skill
          </Typography>

          {/* Update Skill */}
          <Typography id="modal-modal-title" variant="subtitle1" color='grey' component="h2"
            style={textFieldStyle}
          >
            Rate Your <span style={emphasisStyle}>{skillObject.skill_name}</span> Compentncy
          </Typography>
          <form>
            {/* <FormLabel color='primary'>Update your Compentncy Rating Below</FormLabel> */}
            <Slider
              size="small"
              defaultValue={skillObject.emp_rating}
              aria-label="Small"
              valueLabelDisplay="auto"
              color='primary'
              onChange={(e) => { setSkillLevel(e.target.value) }}

            />

            <Box sx={{
              display: 'flex', alignItems: 'self-end',
              pl: 1, pb: 1, marginTop: '5px', margin: '5px 5px'
            }}
            >
              <Button variant='contained' color='secondary' endIcon={<PublishOutlinedIcon />} onClick={editSkill}>
                Update
              </Button>
            </Box>

          </form>

        </Box>
      </Modal>

      {/* DELETE SKILL MODAL */}
      <Modal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton sx={{ paddingLeft: 51, paddingTop: 0 }}>
            <CloseOutlinedIcon onClick={() => setDeleteModalOpen(false)} />
          </IconButton>
          <Typography id="modal-modal-title" variant="h5" component="h2"
            color='primary' style={textFieldStyle}
          >
            Delete {props.skill_type} Skill ?
          </Typography>

          {/* Delete Skill */}
          <Typography id="modal-modal-title" variant="subtitle1" color='grey' component="h2"
            style={textFieldStyle}
          >
            Are you sure that you want to delete <span style={emphasisStyle}>{skillObject.skill_name}</span> Skill?
          </Typography>

          <Box sx={{
            display: 'flex', flexDirection: 'row', alignItems: 'self-end',
            pl: 1, pb: 1, marginTop: '5px', margin: '5px 5px'
          }}
          >
            <Button variant='contained' color='secondary' style={buttonStyle}
              endIcon={<DeleteOutlinedIcon />} onClick={deleteSkill}>
              DELETE
            </Button>

            <Button variant='contained' color='secondary' style={buttonStyle}
              endIcon={<CloseOutlinedIcon />} onClick={() => setDeleteModalOpen(false)}>
              CANCEL
            </Button>
          </Box>


        </Box>
      </Modal>

      {/* UPDATE SKILL NAME MODAL */}
      <Modal
        open={skillModalOpen}
        onClose={() => setSkillModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton sx={{ paddingLeft: 51, paddingTop: 0 }}>
            <CloseOutlinedIcon onClick={() => setSkillModalOpen(false)} />
          </IconButton>
          <Typography id="modal-modal-title" variant="h5" component="h2"
            color='primary' style={textFieldStyle}
          >
            Update {props.skill_type} Skill
          </Typography>

          {/* Update Skill */}
          <Typography id="modal-modal-title" variant="subtitle1" color='grey' component="h2"
            style={textFieldStyle}
          >
            Rate Your <span style={emphasisStyle}>{skillObject.skill_name}</span> Compentncy
          </Typography>
          <form>
            {/* <FormLabel color='primary'>Update your Compentncy Rating Below</FormLabel> */}
            <Slider
              size="small"
              defaultValue={skillObject.emp_rating}
              aria-label="Small"
              valueLabelDisplay="auto"
              color='primary'
              onChange={(e) => { setSkillLevel(e.target.value) }}

            />

            <Box sx={{
              display: 'flex', alignItems: 'self-end',
              pl: 1, pb: 1, marginTop: '5px', margin: '5px 5px'
            }}
            >
              <Button variant='contained' color='secondary' endIcon={<PublishOutlinedIcon />} onClick={editSkill}>
                Update
              </Button>
            </Box>

          </form>

        </Box>
      </Modal>

      {/* SUPERVISOR RATING */}
      <Modal
        open={supModalOpen}
        onClose={() => setSupModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton sx={{ paddingLeft: 51, paddingTop: 0 }}>
            <CloseOutlinedIcon onClick={() => setSupModalOpen(false)} />
          </IconButton>
          <Typography id="modal-modal-title" variant="h5" component="h2"
            color='primary' style={textFieldStyle}
          >
            Supervisor, Please Rate {props.skill_type} Skill
          </Typography>

          {/* Update Skill */}
          <Typography id="modal-modal-title" variant="subtitle1" color='grey' component="h2"
            style={textFieldStyle}
          >
            Rate {subNumber} <span style={emphasisStyle}>{skillObject.skill_name}</span> Compentncy
          </Typography>

          <form>
            {/* <FormLabel color='primary'>Update your Compentncy Rating Below</FormLabel> */}
            <Slider
              size="small"
              defaultValue={skillObject.emp_rating}
              aria-label="Small"
              valueLabelDisplay="auto"
              color='primary'
              onChange={(e) => { setSupRating(e.target.value) }}

            />

            <Box sx={{
              display: 'flex', alignItems: 'self-end',
              pl: 1, pb: 1, marginTop: '5px', margin: '5px 5px'
            }}
            >
              <Button variant='contained' color='secondary' endIcon={<PublishOutlinedIcon />}
                onClick={supervisorRating}
              >
                Submit Rating
              </Button>
            </Box>

          </form>

        </Box>
      </Modal>

    </div>
  );
}

export default SkillCard;