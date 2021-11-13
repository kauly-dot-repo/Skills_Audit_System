import { Button, Card, CardActionArea, CardContent, FormControl, InputLabel, MenuItem, Modal, Select, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import ViewUser from './ViewUser';

const textFieldStyle = { margin: "10px auto" }
const emphasisStyle = {
  textDecoration: 'underline',
}
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


function Subordinates(props) {

  const emp = props.employees;

  const [modalOpen, setModalOpen] = useState(false);
  const [skill_type, setSkillType] = useState('');

  const handleChange = (event) => {
    setSkillType(event.target.value);
  };

  return (
    <div>
      {/* Subordinates */}



      <Card sx={{
        maxWidth: '345', border: '1px solid grey', borderRadius: 4,
        margin: '1px 1px 5px 1px', padding: '2px 2px',
        '&:hover': { border: '2px solid rgb(252, 175, 40)', borderRadius: 4 }
      }}
        onClick={() => {
          console.log('click', emp.staffnumber);

          setModalOpen(true)

        }}
      >
        <CardActionArea>
          <CardContent
          // onClick={setModalOpen(true)}
          >
            <Typography gutterBottom variant="h6" component="div">
              {emp.staffnumber}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {emp.jobTitle}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>


      <Typography align='center'>
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"

        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="subtitle1" color='grey'
              component="h2" style={textFieldStyle}
            >
              {/* View <span style={emphasisStyle}>{emp.staffnumber}</span> Skill? */}
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <FormControl align='center' sx={{ m: 0, minWidth: 340, margin: '15px 1px 15px 1px' }}>
                  <InputLabel id="demo-simple-select-label">Skill Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={skill_type}
                    label="Skill Type"
                    maxWidth

                    onChange={handleChange}
                  >
                    <MenuItem value={'Field Specific'}>Field Specific</MenuItem>
                    <MenuItem value={'Job Specific'}>Job Specific</MenuItem>
                    <MenuItem value={'Soft'}>Soft</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <ViewUser employee={emp} skillType={skill_type} />
            </Typography>
          </Box>
        </Modal>
      </Typography>
    </div>
  );
}

export default Subordinates;