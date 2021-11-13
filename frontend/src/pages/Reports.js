import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SupervisorHeader from '../components/SupervisorHeader';
import { Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { CSVLink, CSVDownload } from "react-csv";

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}
const loadingStyle = {
  padding: 10
}
const loadingImage = {
  maxWidth: '90%',
  margin: ' 3px auto 3px 0px'
}
function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {/* <TableCell component="th" scope="row">
          {row.name}
        </TableCell> */}
        <TableCell align="right">{row.staffnumber}</TableCell>
        <TableCell align="right">{row.email}</TableCell>
        <TableCell align="right">{row.field}</TableCell>
        <TableCell align="right">{row.department}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Field Skills
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Skill Name</TableCell>
                    <TableCell >Supervisor Rating</TableCell>
                    <TableCell align="right">Employee rating</TableCell>


                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.fieldSkills.map((historyRow) => (
                    <TableRow key={historyRow.skill_name}>
                      <TableCell component="th" scope="row">
                        {historyRow.skill_name}
                      </TableCell>
                      <TableCell>{historyRow.sup_rating}</TableCell>
                      <TableCell align="right">{historyRow.emp_rating}</TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Job Skills
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Skill Name</TableCell>
                    <TableCell >Supervisor Rating</TableCell>
                    <TableCell align="right">Employee rating</TableCell>


                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.jobSkills.map((historyRow) => (
                    <TableRow key={historyRow.skill_name}>
                      <TableCell component="th" scope="row">
                        {historyRow.skill_name}
                      </TableCell>
                      <TableCell>{historyRow.sup_rating}</TableCell>
                      <TableCell align="right">{historyRow.emp_rating}</TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Job Soft Skills
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Skill Name</TableCell>
                    <TableCell >Supervisor Rating</TableCell>
                    <TableCell align="right">Employee rating</TableCell>


                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.jobSoftSkills.map((historyRow) => (
                    <TableRow key={historyRow.skill_name}>
                      <TableCell component="th" scope="row">
                        {historyRow.skill_name}
                      </TableCell>
                      <TableCell>{historyRow.sup_rating}</TableCell>
                      <TableCell align="right">{historyRow.emp_rating}</TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Other Skills
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Skill Name</TableCell>
                    <TableCell >Supervisor Rating</TableCell>
                    <TableCell align="right">Employee rating</TableCell>


                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.otherSkills.map((historyRow) => (
                    <TableRow key={historyRow.skill_name}>
                      <TableCell component="th" scope="row">
                        {historyRow.skill_name}
                      </TableCell>
                      <TableCell>{historyRow.sup_rating}</TableCell>
                      <TableCell align="right">{historyRow.emp_rating}</TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const departments = [
  // 'Department of Computing and Informatics',
  { key: 1, value: 'Department of Human Resources' },
  { key: 2, value: 'Department of Student Services' },
  { key: 3, value: 'Department of International Relations' },
  { key: 4, value: 'Department of Education' }
]

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];



export default function CollapsibleTable() {
  const [skillsData, setSkillsData] = useState([]);
  const [fieldData, setFieldData] = useState([]);
  const [allSkills, setAllSkills] = useState([]);

  const [skillName, setSkillName] = useState('');
  const [department, setDepartment] = useState('');

  const [isLoading, setIsLoading] = useState(true);

  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  function filterSkill() {
    console.log('IN FILTER', department);

    //API

    axios.post('http://localhost:8120/filter-by-skillname', { skillName, department })
      .then((response) => {
        console.log('ALL SKILLS: ', response);
        setSkillsData(response.data);
      })

  }

  useEffect(() => {
    axios.get('http://localhost:8120/getAllEmployees')
      .then(response => {
        response.data[0].fieldSkillss = Object.assign({}, response.data[0].fieldSkills)
        console.log('EMPLOYEE RESPONSE', response.data[0].fieldSkillss);
        setSkillsData(response.data)
        setFieldData(skillsData.fieldSkills)
        console.log('EMPLOYEE RESPONSE', response);
        setIsLoading(false)
      })
  }, [])

  const createCsvFileName = ()=> `data_.csv`;
  const headers = [
      { label: 'staffnumber', key: 'staffnumber' },
      { label: 'email', key: 'email' },
      { label: 'Job Skill Name', key: 'jobSkills' },
      { label: 'Job Skills Employee Rating', key: 'emp_rating' },
      { label: 'Job Skills Supervisor Rating', key: 'sup_rating' },
      { label: 'Job Soft Skills', key: 'jobSoftSkills' },
      { label: 'Job Soft Employee Rating', key: 'job_soft_emp_rating' },
      { label: 'Job Soft Supervisor Rating', key: 'job_soft_sup_rating' },
      { label: 'Field Skills', key: 'fieldSkills' },
      { label: 'Field Employee Rating', key: 'field_emp_rating' },
      { label: 'Field Supervisor Rating', key: 'field_sup_rating' },
      { label: 'Other Skills', key: 'otherSkills' },
      { label: 'Other Employee Rating', key: 'other_emp_rating' },
      { label: 'Other Supervisor Rating', key: 'other_sup_rating' },
      // { label: 'Field Skills', key: 'fieldSkills' }
      // { label: 'Job Skills', key: 'otherSkills' }
  ];

  let data = []
  function arrayMax(arr) {
    var len = arr.length, max = -Infinity;
    while (len--) {
      if (Number(arr[len]) > max) {
        max = Number(arr[len]);
      }
    }
    return max;
  };
  function isEmpty(obj) {
    for(var prop in obj) {
      if(obj.hasOwnProperty(prop))
          return false;
  }

  return true;
}
  
  skillsData.forEach(item => {
    if (item.jobSkills.length > 0 || item.jobSoftSkills.length > 0 || item.fieldSkills.length > 0 || item.jobSkills.length > 0){
      data.push({
          staffnumber: item.staffnumber,
          email: item.email,
          jobSkills: !isEmpty(item.jobSkills[0]) ? item.jobSkills[0].skill_name : "",
          emp_rating:!isEmpty(item.jobSkills[0]) ?  item.jobSkills[0].emp_rating : 0,
          sup_rating: !isEmpty(item.jobSkills[0]) ? item.jobSkills[0].sup_rating : 0,
          jobSoftSkills: !isEmpty(item.jobSoftSkills[0]) ? item.jobSoftSkills[0].skill_name : "",
          job_soft_emp_rating: !isEmpty(item.jobSoftSkills[0]) ? item.jobSoftSkills[0].emp_rating : 0,
          job_soft_sup_rating: !isEmpty(item.jobSoftSkills[0]) ? item.jobSoftSkills[0].sup_rating : 0,
          fieldSkills: !isEmpty(item.fieldSkills[0]) ? item.fieldSkills[0].skill_name : "",
          field_emp_rating:!isEmpty(item.fieldSkills[0]) ? item.fieldSkills[0].emp_rating : 0,
          field_sup_rating: !isEmpty(item.fieldSkills[0]) ? item.fieldSkills[0].sup_rating : 0,
          otherSkills: !isEmpty(item.otherSkills[0]) ? item.fieldSkills[0].skill_name : "",
          other_emp_rating: !isEmpty(item.otherSkills[0]) ? item.fieldSkills[0].emp_rating : 0,
          other_sup_rating: !isEmpty(item.otherSkills[0]) ? item.fieldSkills[0].sup_rating : 0
      });
      var random_array =[item.jobSkills.length,item.jobSoftSkills.length,item.fieldSkills.length,item.otherSkills.length];
      var array_with_highest_size=arrayMax(random_array);
    
      for (let i = 1; i < array_with_highest_size; i++) {
          const jobSkills = item.jobSkills[i];
          const jobSoftSkills = item.jobSoftSkills[i];
          const fieldSkills = item.fieldSkills[i];
          const otherSkills = item.otherSkills[i];

          data.push({
              staffnumber: '',
              email: '',
              jobSkills:  !isEmpty(item.jobSkills[i]) ? jobSkills.skill_name : '',
              emp_rating:  !isEmpty(item.jobSkills[i]) ? jobSkills.emp_rating : 0,
              sup_rating:  !isEmpty(item.jobSkills[i]) ? jobSkills.sup_rating : 0,
              jobSoftSkills:  !isEmpty(item.jobSoftSkills[i]) ? jobSoftSkills.skill_name : "",
              job_soft_emp_rating:  !isEmpty(item.jobSoftSkills[i]) ? jobSoftSkills.emp_rating : 0,
              job_soft_sup_rating:  !isEmpty(item.jobSoftSkills[i]) ? jobSoftSkills.sup_rating : 0,
              fieldSkills:  !isEmpty(item.fieldSkills[i]) ? fieldSkills.skill_name : "",
              field_emp_rating:  !isEmpty(item.fieldSkills[i]) ? fieldSkills.emp_rating : 0,
              field_sup_rating:  !isEmpty(item.fieldSkills[i]) ? fieldSkills.sup_rating : 0,
              otherSkills:  !isEmpty(item.otherSkills[i]) ? otherSkills.skill_name : "",
              other_emp_rating:  !isEmpty(item.otherSkills[i]) ? otherSkills.emp_rating : 0,
              other_sup_rating:  !isEmpty(item.otherSkills[i]) ? otherSkills.sup_rating : 0,
              
          });
      }
    }
  });

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
  }
  return (
    // <SupervisorHeader>
    <Container>
      <div>
        <Typography variant='h1' align='center'>
          Draw Reports Here !
        </Typography>

        <div>
          <Typography variant='h4' align='center'>
            All SKills
          </Typography>

          <div>
            <div style={{ margin: '10px 0' }}>
              {/* <button onClick={() => onBtnUpdate()}>
          Show CSV export content text
        </button> */}
              {/* <button onClick={() => onBtnExport()}>
                Download Report as CSV
              </button> */}
            </div>

            <div style={{ marginBottom: '5px' }}>
              {/* <input
                type="text"
                onInput={() => onQuickFilterChanged()}
                id="quickFilter"
                placeholder="quick filter..."
              /> */}

            </div>

            <div>
              <form>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={5} lg={4}>
                    {/* <Box sx={{ display: 'flex', flexDirection: 'row' }}> */}
                    <TextField
                      fullWidth label='Filter by Skill Name' color="secondary"
                      placeholder="e.g., Project Management"
                      variant='filled'
                      onChange={(e) => { setSkillName(e.target.value) }}
                    />
                  </Grid>

                  <Grid item xs={12} md={5} lg={4}>
                    {/* <Box sx={{ display: 'flex', flexDirection: 'row' }}> */}

                    {/* <TextField
                        fullWidth label='Filter by Department' color="secondary"
                        placeholder="e.g., Department of Human Resources"
                        variant='filled'
                        onChange={(e) => { setDepartment(e.target.value) }}
                      /> */}
                    <FormControl fullWidth>
                      {/* <InputLabel>Filter</InputLabel> */}
                      <Select
                        placeholder={'Department of Human Resources'}
                        label='Filter by Department'
                        variant='filled'
                        onChange={(e) => setDepartment(e.target.value)}
                        value={department}
                      >
                        {departments.map(dep => (
                          <MenuItem key={dep.key} value={dep.value}>{dep.value}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={2} lg={4}>
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={filterSkill}
                    >
                      Filter
                    </Button>
                  </Grid>

                </Grid>
              </form>
              <CSVLink
                  data={data}
                  headers={headers}
                  filename={createCsvFileName()}
                  target="_blank"
                  style={{ textDecoration: 'none', outline: 'none', height: '5vh' }}
              >
                  <Button variant="contained" color="secondary" style={{ height: '100%' }}>
                      Download CSV
                  </Button>
              </CSVLink>
            </div>

            <center>
              <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell>Staff Number</TableCell>
                      <TableCell align="right">Email</TableCell>
                      <TableCell align="right">Field</TableCell>
                      <TableCell align="right">Department</TableCell>

                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {skillsData.map((row) => (
                      <Row key={row.name} row={row} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </center>
          </div>

        </div>
      </div>
    </Container >
    // </SupervisorHeader>
  );
}