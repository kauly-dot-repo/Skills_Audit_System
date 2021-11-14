import { Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

// var ;
const loadingStyle = {
  padding: 10
}
const loadingImage = {
  maxWidth: '90%',
  margin: ' 3px auto 3px 0px'
}


function Reports(props) {

  const [isLoading, setIsLoading] = useState(true);
  const [skillsData, setSkillsData] = useState([]);
  const [fieldData, setFieldData] = useState([]);


  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);


  useEffect(() => {
    axios.get('http://localhost:8120/getAllEmployees')
      .then(response => {
        response.data[0].fieldSkillss = Object.assign({},response.data[0].fieldSkills)
        console.log('EMPLOYEE RESPONSE', response.data[0].fieldSkillss);
        setSkillsData(response.data)
        setFieldData(skillsData.fieldSkills)
        console.log('EMPLOYEE RESPONSE', response);
        setIsLoading(false)
      })
  }, [])

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


    const onGridReady = (params) => {
      // alert(params.api);
      setGridApi(params.api);
      setGridColumnApi(params.columnApi);
    };

    const onBtnExport = () => {
      gridApi.exportDataAsCsv();
    };

    // const onBtnUpdate = () => {
    //   document.querySelector('#csvResult').value = gridApi.getDataAsCsv();
    // };

    const onQuickFilterChanged = () => {
      gridApi.setQuickFilter(document.getElementById('quickFilter').value);
    };

    return (
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
              <button onClick={() => onBtnExport()}>
                Download Report as CSV
              </button>
            </div>

            <div style={{ marginBottom: '5px' }}>
              <input
                type="text"
                onInput={() => onQuickFilterChanged()}
                id="quickFilter"
                placeholder="quick filter..."
              />

            </div>
            <center>


              <div className="ag-theme-alpine" style={{ height: 350, width: 1300 }}>
                <AgGridReact
                  rowData={skillsData}
                  rowSelection={'single'}
                  suppressExcelExport={true}
                  popupParent={document.body}
                  onGridReady={onGridReady}
                >
                <AgGridColumn headerName="Staff Number" field="staffnumber" sortable={true} filter={true} />
                <AgGridColumn headerName="JobSpecific" field="jobSkills" sortable={true} filter={true} />

               <AgGridColumn field="staffnumber" sortable={true} filter={true}></AgGridColumn>
                  <AgGridColumn field="email" sortable={true} filter={true}></AgGridColumn>
                  <AgGridColumn field="field" sortable={true} filter={true}></AgGridColumn>
                  <AgGridColumn field="department" sortable={true} filter={true}></AgGridColumn>
                  <AgGridColumn field="supervisor" sortable={true} filter={true}></AgGridColumn>
                  <AgGridColumn field="supervisorNo" sortable={true} filter={true}></AgGridColumn>
                  <AgGridColumn field="jobTitle" sortable={true} filter={true}></AgGridColumn>
                  <AgGridColumn rowGroup={true}
                    field="jobSkills"
                    sortable={true}
                    hide={false}
                    filter={true} />
                  <AgGridColumn headerName="Skill name" field="fieldSkillss.0.skill_name" sortable={true} filter={true}></AgGridColumn>
                  <AgGridColumn field="jobSoftSkills" sortable={true} filter={true}></AgGridColumn>
                  <AgGridColumn field="otherSkills" sortable={true} filter={true}></AgGridColumn>
                </AgGridReact> 
              </div>
            </center>
          </div>

        </div>
      </div>
    );

  }
}

export default Reports;