import { Avatar, Button, Card, CardContent, CardHeader, CardMedia, Container, IconButton, Modal, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
// import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
// import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import SkipNextIcon from '@mui/icons-material/SkipNext';





function SkillCard(props) {

  const theme = useTheme();
  const skillObject = props.skill;


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
              <IconButton color='primary' sx={{ padding: '5px 5px' }}>
                {/* <IconButton> */}
                <DeleteOutlinedIcon />
              </IconButton>
            }
            titleTypographyProps={{ variant: 'h6' }}
            title={skillObject.skill_name}
            
            
            
          // subheader={props.skill.jobTitle} //skill description
          />
        </Box>


        {/* Card Content */}
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'row' }}>

            <Typography variant="subtitle1" color="primary" component="div" sx={{ marginRight: 1 }}>
              Employee Rating: {skillObject.emp_rating}
            </Typography>
            <Typography variant="subtitle1" color="primary" component="div" sx={{ marginLeft: 1 }}>
              Supervisor Rating: {skillObject.sup_rating}
            </Typography>
          </CardContent>


        </Box>

      </Card>


    </div>
  );
}

export default SkillCard;