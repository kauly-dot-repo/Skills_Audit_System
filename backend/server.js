const express = require('express');
const app = express();
app.use(express.json());

const Employee = require('./models/employee.model');

const mongoose = require("mongoose");

const cors = require("cors");
app.use(cors({ origin: "http://localhost:3000" }));

const URL = 'mongodb://localhost:27017/SkillsAudit';

const data_connection = mongoose.connect(URL, {});

//EMPLOYEE ACTIONS
//Add/Register Employee--------------------------------------
app.post('/register', async (req, res) => {
  const data = req.body;
  console.log(data);

  const register = await new Employee({
    // firstname: data.firstname,
    // lastname: data.lastname,
    staffnumber: data.staffnumber,
    email: data.email,
    password: data.password,
    field: data.field, //drop-down
    //drop down - depending on field
    department: data.department,
    supervisor: data.supervisor,
    //drop down - depending on field
    jobTitle: data.jobTitle
  }).save();

  return res.send(register);
});

//Login-----------------------------------------------------
app.get("/login/:email/:password", (req, res) => {
  const email = req.params.email;
  const password = req.params.password;
  // console.log('Email: ' + email + ' Password: ' + password);

  return Employee.findOne(
    {
      email: email,
      password: password
    },
    { password: 0 })
    .then(result => {
      console.log(result);
      res.send(result)
    });
});


//Get One Employee by Staff Number
app.get("/getEmployee/:staffnumber", (req, res) => {
  const staffnumber = req.params.staffnumber;
  // console.log('Email: ' + email + ' Password: ' + password);

  return Employee.findOne(
    { staffnumber },
    { password: 0 })
    .then(result => {
      console.log(result);
      res.send(result)
    });
});

//Update Employee info
app.post('/updateEmployee', async (req, res) => {
  const data = req.body;
  console.log(data);

  return Employee.updateOne(
    { staffnumber: data.staffnumber },
    {
      $set: data
    }, {multi: true, upsert: true}
  )
});

//Retrieve/Find All Employees-------------------------------
app.get('/getAllEmployees', (req, res) => {
  const data = req.body;

  return Employee.find({},
    {
      _id: 0,
      password: 0,
      jobSkills: 0,
      fieldSkills: 0,
      otherSkills: 0,
      __v: 0,

    })
    .then(result => res.send(result))

});

//Delete ONE Employee--------------------------------------
app.delete("/deleteEmployee", (req, res) => {
  const data = req.body;

  return Employee.deleteOne(
    {
      email: data.email,
      password: data.password

    },
    {
      _id: 0,
      __v: 0,
    })
    .then(result => res.send(result));
});

//Delete All Employees
app.delete('/deleteAllEmployees', (req, res) => {
  const data = req.body;

  return Employee.deleteMany({},
    {
      _id: 0,
      password: 0,
      __v: 0,

    })
    .then(result => res.send(result))

});


//Retrieve Subodinates
app.get('/get-subordinates', (req, res) => {
  const supervisorNo = req.params.supervisorNo;

  return Employee.find(
    { supervisorNo },
    { email: 0, password: 0 }
  ).then(result => {
    console.log('SUBORDINATES: ', result)
    res.send(result)
  })
});



//SKILLS ACTIONS

//Retrieve all skills
app.get('/get-employee-skills/:staffnumber', (req, res) => {
  const staffnumber = req.params.staffnumber;

  return Employee.findOne({ staffnumber },
    {
      jobSkills: 1,
      jobSoftSkills: 1,
      fieldSkills: 1,
      otherSkills: 1
    })
    .then(result => {
      console.log('Employee Skills: ', result);
      res.send(result)
    });
});



//Add New Skill -------------------------------
//Field-Related Skill
app.post('/new-field-skill', (req, res) => {
  const data = req.body;
  console.log(data);

  return Employee.updateOne(
    { staffnumber: data.staffnumber },
    {
      $push: {
        fieldSkills: {
          skill_name: data.skill_name,
          emp_rating: data.emp_rating
        }
      }
    },
    {
      multi: true,
      upsert: true
    }
  )
    .then(
      result => {
        console.log('RESULT: ' + result)
        return res.send(result);
      }
    );
});

//Job-Related Skill
app.post('/new-job-skill', (req, res) => {
  const data = req.body;
  console.log(data);

  return Employee.updateOne(
    { staffnumber: data.staffnumber },
    {
      $push: {
        jobSkills: {
          skill_name: data.skill_name,
          emp_rating: data.emp_rating
        }
      }
    },
    {
      multi: true,
      upsert: true
    }
  )
    .then(
      result => {
        console.log('RESULT: ' + result)
        return res.send(result);
      }
    );
});

//Job-Related Soft Skill
app.post('/new-soft-skill', (req, res) => {
  const data = req.body;
  console.log(data);

  return Employee.updateOne(
    { staffnumber: data.staffnumber },
    {
      $push: {
        jobSoftSkills: {
          skill_name: data.skill_name,
          emp_rating: data.emp_rating
        }
      }
    },
    {
      multi: true,
      upsert: true
    }
  )
    .then(
      result => {
        console.log('Result: ' + result)
        return res.send(result);
      }
    );
});

//Other Skill
app.post('/new-other-skill', (req, res) => {
  const data = req.body;
  console.log(data);

  return Employee.updateOne(
    { staffnumber: data.staffnumber },
    {
      $push: {
        otherSkills: {
          skill_name: data.skill_name,
          emp_rating: data.emp_rating
        }
      }
    },
    {
      multi: true,
      upsert: true
    }
  )
    .then(
      result => {
        console.log('RESULT: ' + result)
        return res.send(result);
      }
    );
});


//Add Supervisor Rating -------------------------------
//Field-Related Skill
app.post('supervisor-field-rating', (req, res) => {
  const data = re.body;

  return Employee.updateOne(
    {
      email: data.email,
      "fieldSkills.skill_name": data.skill_name
    },
    {
      $set: {
        "fieldSkills.$.sup_rating": data.sup_rating
      }
    },
    { multi: true, upsert: true }
  ).then(result => {
    return res.send(result);
  });
});

//Job-Related Skill
app.post('/supervisor-job-rating', (req, res) => {
  const data = re.body;

  return Employee.updateOne(
    {
      email: data.email,
      "jobSkills.skill_name": data.skill_name
    },
    {
      $set: {
        "jobSkills.$.sup_rating": data.sup_rating
      }
    },
    { multi: true, upsert: true }
  ).then(result => {
    return res.send(result);
  });
});



//Update Employee Rating -------------------------------
//Field-Related Skill
app.post('/update-field-rating', (req, res) => {
  const data = re.body;

  return Employee.updateOne(
    {
      email: data.email,
      "fieldSkills.skill_name": data.skill_name
    },
    {
      $set: {
        "fieldSkills.$.sup_rating": data.sup_rating
      }
    },
    { multi: true, upsert: true }
  ).then(result => {
    return res.send(result);
  });
});

//Job-Related Skill
app.post('/update-job-rating', (req, res) => {
  const data = re.body;

  return Employee.updateOne(
    {
      email: data.email,
      "jobSkills.skill_name": data.skill_name
    },
    {
      $set: {
        "jobSkills.$.sup_rating": data.sup_rating
      }
    },
    { multi: true, upsert: true }
  ).then(result => {
    return res.send(result);
  });
});

//Other Skill
app.post('/update-other-rating', (req, res) => {
  const data = re.body;

  return Employee.updateOne(
    {
      email: data.email,
      "otherSkills.skill_name": data.skill_name
    },
    {
      $set: {
        "otherSkills.$.sup_rating": data.sup_rating
      }
    },
    { multi: true, upsert: true }
  ).then(result => {
    return res.send(result);
  });
});


const PORT = 8120;
app.listen(PORT, () => {
  console.log("Server is running on Port " + PORT);
});