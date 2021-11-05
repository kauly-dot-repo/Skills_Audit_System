const express = require('express');
const app = express();
app.use(express.json());

const Employee = require('./models/employee.model');

const mongoose = require("mongoose");

const cors = require("cors");
app.use(cors({}));

const URL = 'mongodb://localhost:27017/SkillsAudit';

const data_connection = mongoose.connect(URL, {});

//EMPLOYEE ACTIONS
  //Add/Register Employee--------------------------------------
  app.post('/register', async (req, res) => {
    const data = req.body;

    const register = await new Employee({
      firstname: data.firstname,
      lastname: data.lastname,
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
  app.get("/login", (req, res) => {
    const data = req.body;

    return Employee.findOne({ email: data.email, password: data.password }, { _id: 0, password: 0 })
      .then(result => res.send(result));
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



//SKILLS ACTIONS
  //Add New Skill -------------------------------
  //Field-Related Skill
  app.post('/new-field-skill', (req, res) => {
    const data = req.body;

    return Employee.updateOne(
      { email: data.email },
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
          return res.send(result);
        }
      );
  });

  //Job-Related Skill
  app.post('/new-job-skill', (req, res) => {
    const data = req.body;

    return Employee.updateOne(
      { email: data.email },
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
          return res.send(result);
        }
      );
  });

  //Other Skill
  app.post('/new-other-skill', (req, res) => {
    const data = req.body;

    return Employee.updateOne(
      { email: data.email },
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






// require('./controllers/employee.controller')(app);
// require('./controllers/skills.controller')(app);

app.listen(6000, () => {
  console.log("Server is running");
});