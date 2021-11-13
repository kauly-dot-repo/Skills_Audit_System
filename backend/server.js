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
    supervisorNo: data.supervisorNo,
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
    }, { multi: true, upsert: true }
  )
});

//Retrieve/Find All Employees-------------------------------
app.get('/getAllEmployees', (req, res) => {
  const data = req.params.data;

  return Employee.find({},
    {
      _id: 0,
      password: 0,
      __v: 0,

    })
    .then(result => {
      console.log('RESULT: ', result);
      res.send(result)
    })

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
app.get('/get-subordinates/:supervisorNo', (req, res) => {
  const supervisorNo = req.params.supervisorNo;

  return Employee.find(
    { supervisorNo: supervisorNo },
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

//DELETE A SKILL
//Field-Related Skill
app.post('/delete-field-skill', (req, res) => {
  const data = req.body;
  console.log('DELETE Field REQUEST', data);

  return Employee.updateOne(
    { staffnumber: data.staffnumber },
    {
      $pull: {
        fieldSkills: {
          skill_name: data.skill_name,
          emp_rating: data.emp_rating,
          sup_rating: data.sup_rating
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
        console.log('DELETE Field RESULT: ', result)
        return res.send(result);
      }
    );
});

//Job-Related Skill
app.post('/delete-job-skill', (req, res) => {
  const data = req.body;
  console.log('DELETE Job REQUEST', data);

  return Employee.updateOne(
    { staffnumber: data.staffnumber },
    {
      $pull: {
        jobSkills: {
          skill_name: data.skill_name,
          emp_rating: data.emp_rating,
          sup_rating: data.sup_rating
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
        console.log('DELETE Job RESULT: ', result)
        return res.send(result);
      }
    );
});

//Job-Related Soft Skill
app.post('/delete-soft-skill', (req, res) => {
  const data = req.body;
  console.log('DELETE Soft REQUEST', data);

  return Employee.updateOne(
    { staffnumber: data.staffnumber },
    {
      $pull: {
        jobSoftSkills: {
          skill_name: data.skill_name,
          emp_rating: data.emp_rating
          // sup_rating: data.sup_rating
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
        console.log('DELETE Soft RESULT: ', result)
        return res.send(result);
      }
    );
});

//Other Skill
app.post('/delete-other-skill', (req, res) => {
  const data = req.body;
  console.log('DELETE Other REQUEST', data);

  return Employee.updateOne(
    { staffnumber: data.staffnumber },
    {
      $pull: {
        otherSkills: {
          skill_name: data.skill_name,
          emp_rating: data.emp_rating,
          sup_rating: data.sup_rating
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
        console.log('DELETE Other RESULT: ', result)
        return res.send(result);
      }
    );
});

//ADD NEW SKILL --------------------------------------
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
          emp_rating: data.emp_rating,
          sup_rating: 0
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
          emp_rating: data.emp_rating,
          sup_rating: 0
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
          emp_rating: data.emp_rating,
          sup_rating: 0
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
          emp_rating: data.emp_rating,
          sup_rating: 0
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
  const data = req.body;

  return Employee.updateOne(
    {
      staffnumber: data.staffnumber,
      "fieldSkills.skill_name": data.skill_name
    },
    {
      $set: {
        "fieldSkills.$.sup_rating": data.sup_rating
      }
    },
    { multi: true, upsert: true }
  ).then(result => {
    console.log('FIELD RATING: ', result)
    return res.send(result);
  });
});

//Job-Related Skill
app.post('/supervisor-job-rating', (req, res) => {
  const data = req.body;

  return Employee.updateOne(
    {
      staffnumber: data.staffnumber,
      "jobSkills.skill_name": data.skill_name
    },
    {
      $set: {
        "jobSkills.$.sup_rating": data.sup_rating
      }
    },
    { multi: true, upsert: true }
  ).then(result => {
    console.log('JOB RATING: ', result)
    return res.send(result);
  });
});

app.post('/supervisor-soft-rating', (req, res) => {
  const data = req.body;
  console.log('SOFT DATA: ', data)

  return Employee.updateOne(
    {
      staffnumber: data.staffnumber,
      "jobSoftSkills.skill_name": data.skill_name
    },
    {
      $set: {
        "jobSoftSkills.$.sup_rating": data.sup_rating
      }
    },
    { multi: true, upsert: true }
  ).then(result => {
    console.log('SOFT RATING: ', result)
    return res.send(result);
  });
});


//Filter by Skill Name
app.post('/filter-by-skillname', (req, res) => {
  const data = req.body;
  
  if (data.department !== undefined  && data.skillName == ""){
   
      return Employee.find(
        {
        department:data.department,
      }).then(result => {
        console.log('filter-by-skillname:', result)
        return res.send(result);
      });
  }else if (data.department == ""  && data.skillName !== undefined){
    return Employee.find(
   
      {
        $or: [
          { "jobSkills.skill_name": data.skillName },
          { "fieldSkills.skill_name": data.skillName },
          { "jobSoftSkills.skill_name": data.skillName },
          { "otherSkills.skill_name": data.skillName }
        ]
      }
    ).then(result => {
      console.log('filter-by-skillname:', result)
      return res.send(result);
    });
  }else{
    return Employee.find(
   
      {
        $match:{ department:data.department},
        $or: [
          { "jobSkills.skill_name": data.skillName },
          { "fieldSkills.skill_name": data.skillName },
          { "jobSoftSkills.skill_name": data.skillName },
          { "otherSkills.skill_name": data.skillName }
        ]
      }
    ).then(result => {
      console.log('filter-by-skillname:', result)
      return res.send(result);
    });
  }



})


//UPDATE EMPLOYEE RATING -------------------------------
//Field-Related Skill
app.post('/update-field-rating', (req, res) => {
  const data = req.body;
  console.log('UPDATE FIELD REQUEST: ', data);

  return Employee.updateOne(
    {
      staffnumber: data.staffnumber,
      "fieldSkills.skill_name": data.skill_name
    },
    {
      $set: {
        "fieldSkills.$.emp_rating": data.emp_rating
      }
    },
    { multi: true, upsert: true }
  ).then(result => {
    console.log('UPDATE FIELD SKILL RESULT:', result)
    return res.send(result);
  });
});

//Job-Related Skill
app.post('/update-job-rating', (req, res) => {
  const data = req.body;
  console.log('JOB RATING REQUEST:', data);

  return Employee.updateOne(
    {
      staffnumber: data.staffnumber,
      "jobSkills.skill_name": data.skill_name
    },
    {
      $set: {
        "jobSkills.$.emp_rating": data.emp_rating
      }
    },
    { multi: true, upsert: true }
  ).then(result => {
    console.log('JOB RATING: ', result);
    return res.send(result);
  });
});

//Soft Skills
app.post('/update-soft-rating', (req, res) => {
  const data = req.body;
  console.log('SOFT RATING REQUEST:', data);

  return Employee.updateOne(
    {
      staffnumber: data.staffnumber,
      "jobSoftSkills.skill_name": data.skill_name
    },
    {
      $set: {
        "jobSoftSkills.$.emp_rating": data.emp_rating
      }
    },
    { multi: true, upsert: true }
  ).then(result => {
    return res.send(result);
    console.log('SOFT SKILL RATING: ', result);
  });
});

//Other Skill
app.post('/update-other-rating', (req, res) => {
  const data = re.body;

  return Employee.updateOne(
    {
      saffnumber: data.saffnumber,
      "otherSkills.skill_name": data.skill_name
    },
    {
      $set: {
        "otherSkills.$.emp_rating": data.emp_rating
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